#!/usr/bin/env python

# -----------------------------------------------------------------------
# admindatabase.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# -----------------------------------------------------------------------

import flask
import requests
import re
import psycopg2
import pandas as pd
import video as videomod
import os
from datetime import datetime

# ----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'
_PORT = '5432'
_ADMIN_USER = os.environ['ADMIN_USERNAME']


# ----------------------------------------------------------------------
# get_title
# Gets the title of the video with the given id
# Parameters: id -- an integer
# Returns: the title of the video that matches the id, None otherwise
# ----------------------------------------------------------------------


def get_title(id):
    video = get_video(id)
    if video is None:
        return None
    return video.get_title()


# ----------------------------------------------------------------------
# timestamp
# Returns: the date and time of the timestamp
# ----------------------------------------------------------------------


def timestamp():
    return str(datetime.now().replace(microsecond=0))


# ----------------------------------------------------------------------
# get_video
# Gets the video with the given id
# Parameters: id -- an integer
# Returns: the video that matches the id
# ----------------------------------------------------------------------


def get_video(id):

    with psycopg2.connect(host=_HOST_URL,
                          database=_DATABASE,
                          user=_USERNAME,
                          password=_PASSWORD) as connection:
        with connection.cursor() as cursor:

            query_str = "SELECT * FROM videos WHERE id=(%s)"
            cursor.execute(query_str, (f'{id}',))

            table = cursor.fetchall()
            if len(table) == 0:
                return None

            row = table[0]
            video = videomod.Video(row[0], row[1], row[2], row[3])
            return video


# ----------------------------------------------------------------------
# get_videos
# Gets the videos that match the search terms.
# Parameters: query - a search term
# Returns: the videos that match the search term
# ----------------------------------------------------------------------


def get_videos(query):

    videos = []

    with psycopg2.connect(host=_HOST_URL,
                          database=_DATABASE,
                          user=_USERNAME,
                          password=_PASSWORD) as connection:
        with connection.cursor() as cursor:

            query_str = "SELECT * FROM videos"
            if query == '':
                query_str += " ORDER BY id"
                cursor.execute(query_str)
            else:
                query_str += " WHERE title ILIKE (%s) OR url ILIKE (%s)"
                query_str += " ESCAPE '\\' ORDER BY id"

                query = query.replace('_', '\\_').replace('%', '\\%')
                query = (f'%{query}%', f'%{query}%')
                cursor.execute(query_str, query)

            table = cursor.fetchall()
            for row in table:
                video = videomod.Video(row[0], row[1], row[2], row[3])
                videos.append(video)

    return videos


# ----------------------------------------------------------------------
# insert_video
# Accesses the database and returns the results of the query.
# Parameters: title - the title of the video to be added
#             url - the url of the video to be added
# Returns: the results of the query
# ----------------------------------------------------------------------


def insert_video(title, url):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:

                url = url.strip()

                # extract video direct link from hosted link
                response = requests.get(url).text

                if not re.fullmatch(
                        '(https:\/\/)?mediacentral\.princeton\.edu\/media\/[a-zA-Z0-9_\%\+\(\)]+\/[a-zA-Z0-9_]+', url):
                    raise Exception('Could not verify URL for insertion')

                match = re.search(
                    '<meta property="og:video:secure_url" content="(.*?)">', response)
                if match is None:
                    raise Exception(
                        'Could not extract video link from verified URL')

                video_url = match.group(1)

                postgres_insert_query = """ INSERT INTO videos (title, url, uploadtimestamp) VALUES (%s, %s, %s)"""
                record_to_insert = (title, video_url, timestamp())
                cursor.execute(postgres_insert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into video table")
                return True

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into video table", error)
        return False

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# ----------------------------------------------------------------------
# delete_video
# Accesses the database and returns the results of the query.
# Parameters: id - the id number of the video to be deleted
# Returns: the results of the query
# ----------------------------------------------------------------------


def delete_video(id):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                postgres_delete_query = """ DELETE from videos where id = %s"""
                cursor.execute(postgres_delete_query, (id,))

                connection.commit()
                count = cursor.rowcount
                print(count, "Record deleted successfully")

    except (Exception, psycopg2.Error) as error:
        print("Error in Delete operation", error)
    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# -----------------------------------------------------------------------
# get_responses
# Gets the table of average responses.
# Returns: table of average responses
# -----------------------------------------------------------------------


def get_responses():
    try:
        with psycopg2.connect(host=_HOST_URL,
                            database=_DATABASE,
                            user=_USERNAME,
                            password=_PASSWORD) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, title, sum_valence_initial, sum_arousal_initial, num_responses, sum_valence_final, sum_arousal_final, sum_valence_delta, sum_arousal_delta, url FROM videos;")
                rows = cursor.fetchall()

                video_data = []
                for row in rows:
                    num_responses = row[4]
                    avg_valence_initial = row[2] / num_responses if num_responses > 0 else 0
                    avg_arousal_initial = row[3] / num_responses if num_responses > 0 else 0
                    avg_valence_final = row[5] / num_responses if num_responses > 0 else 0
                    avg_arousal_final = row[6] / num_responses if num_responses > 0 else 0
                    avg_valence_delta = row[7] / num_responses if num_responses > 0 else 0
                    avg_arousal_delta = row[8] / num_responses if num_responses > 0 else 0

                    video = {
                        'id': row[0],
                        'title': row[1],
                        'avg_valence_initial': avg_valence_initial,
                        'avg_arousal_initial': avg_arousal_initial,
                        'avg_valence_final': avg_valence_final,
                        'avg_arousal_final': avg_arousal_final,
                        'avg_valence_delta': avg_valence_delta,
                        'avg_arousal_delta': avg_arousal_delta,
                        'url': row[9],
                    }
                    video_data.append(video)

    except (Exception, psycopg2.Error) as error:
        video_data = 'Failed to retrieve average table'
        print(video_data, error)
    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
            return video_data

# -----------------------------------------------------------------------
# get_responses_individual
# Gets the table of individual responses where id matches video_id.
# Parameters: video_id - the video id
# Returns: table of individual responses
# -----------------------------------------------------------------------


def get_responses_individual(video_id):
    video_info = None

    try:
        with psycopg2.connect(host=_HOST_URL,
                            database=_DATABASE,
                            user=_USERNAME,
                            password=_PASSWORD) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT title, id, url FROM videos WHERE id = %s;", (video_id,))
                video_info = cursor.fetchone()

                cursor.execute("SELECT id, sessionid, valence_initial, valence_final, valence_delta, arousal_initial, arousal_final, arousal_delta, responsetimestamp FROM responses WHERE videoid = %s;", (video_id,))
                rows = cursor.fetchall()

                video_data = []
                for row in rows:
                    video = {
                        'id': row[0],
                        'sessionid': row[1],
                        'valence_initial': row[2],
                        'valence_final': row[3],
                        'valence_delta': row[4],
                        'arousal_initial': row[5],
                        'arousal_final': row[6],
                        'arousal_delta': row[7],
                        'responsetimestamp': row[8],
                    }
                    video_data.append(video)

    except (Exception, psycopg2.Error) as error:
        video_data = 'Failed to retrieve average table'
        print(video_data, error)
    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
            return {'video_data': video_data, 'video_info': video_info}

# ----------------------------------------------------------------------
# insert_response
# Accesses the database and returns the results of the query.
# Parameters: sessionid - the session number
#             vi - initial valence
#             vf - final valence
#             vd - delta valence
#             ai - initial arousal
#             af - final arousal
#             ad - delta arousal
# Returns: the results of the query
# ----------------------------------------------------------------------


def insert_response(video_id, vi, vf, vd, ai, af, ad):
    status = None
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                postgres_insert_query = """ INSERT INTO responses (sessionid,
                                            videoid,
                                            valence_initial, valence_final,
                                            valence_delta, arousal_initial,
                                            arousal_final, arousal_delta,
                                            responsetimestamp) VALUES
                                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""

                session_id = flask.session.get('sessionid', None)
                # nonexisting session
                if session_id is None:
                    session_id = sessionid()
                    if session_id is None:
                        raise Exception('Could not generate sessionid')
                    flask.session['sessionid'] = session_id

                print(f'Inserting with sessionid {session_id}')
                record_to_insert = (session_id, video_id, vi, vf, vd,
                                    ai, af, ad, timestamp())
                cursor.execute(postgres_insert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into responses table")
                status = True

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into responses table", error)
        status = False

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        return status

# ----------------------------------------------------------------------
# update_response
# Accesses the database and returns the results of the query.
# Parameters: sessionid - the session number
#             response - optional emotions associated with video
# Returns: the results of the query
# ----------------------------------------------------------------------


def update_response(sessionid, feedback):
    try:
        status = None
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                print("Table Before updating record ")
                sql_select_query = """select * from responses where sessionid = %s"""
                cursor.execute(sql_select_query, (sessionid,))
                record = cursor.fetchone()
                print(record)

                # Update single record now
                sql_update_query = """Update responses set feedback = %s where sessionid = %s"""
                cursor.execute(sql_update_query, (feedback, sessionid))
                connection.commit()
                count = cursor.rowcount
                print(count, "Record Updated successfully ")

                print("Table After updating record ")
                sql_select_query = """select * from responses where sessionid = %s"""
                cursor.execute(sql_select_query, (sessionid,))
                record = cursor.fetchone()
                print(record)
                status = True

    except (Exception, psycopg2.Error) as error:
        print("Error in update operation", error)
        status = False

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        return status


# ----------------------------------------------------------------------
# update_sum
# Updates video data given data from a response
# Parameters: id - the id corresponding to the video
#             ai - initial arousal of newly added response
#             vi - initial valence of newly added response
#             af - final arousal of newly added response
#             vf - final valence of newly added response
#             ad - delta arousal of newly added response
#             vd - delta valence of newly added response
# Returns:
# ----------------------------------------------------------------------


def update_sum(id, ai, vi, af, vf, ad, vd):
    try:
        status = None
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                # Update sum in row that matches id
                sql_update_query = """
                UPDATE videos
                SET sum_arousal_initial = sum_arousal_initial + %s,
                    sum_valence_initial = sum_valence_initial + %s,
                    sum_arousal_final = sum_arousal_final + %s,
                    sum_valence_final = sum_valence_final + %s,
                    sum_arousal_delta = sum_arousal_delta + %s,
                    sum_valence_delta = sum_valence_delta + %s,
                    num_responses = num_responses + 1
                WHERE id = %s;
                """
                cursor.execute(sql_update_query, (ai, vi, af, vf, ad, vd, id))
                connection.commit()
                status = True

    except (Exception, psycopg2.Error) as error:
        print("Error in update operation", error)
        status = False

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        return status

# ----------------------------------------------------------------------
# generate_sessionid
# Create new sessionid for the current user
# Parameters:
# Returns: new sessionid
# ----------------------------------------------------------------------


def sessionid():
    sessionid = None
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                # Update sum in row that matches id
                sql_query = "INSERT INTO sessions DEFAULT VALUES " +\
                            "RETURNING id"
                cursor.execute(sql_query)
                sessionid = cursor.fetchone()[0]
                connection.commit()

    except (Exception, psycopg2.Error) as error:
        print("Error in insert operation", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        return sessionid


def is_authorized(email, path):
    # all logged-in users are authorized to view researcher page
    if re.fullmatch('\/researcher(\/([1-9][0-9]*))?', path) is not None:
        return True
    # only admin is authorized to view admin page
    if path == '/admin' and email == _ADMIN_USER:
        return True
    return False


# ----------------------------------------------------------------------
# get_dataframe
# Connects to database and gets dataframe
# Parameters:
# Returns: the results of the query
# ----------------------------------------------------------------------

def get_dataframe():
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                query_str = """SELECT responses.*, videos.title, videos.url
                               FROM responses
                               JOIN videos ON responses.videoid = videos.id"""
                cursor.execute(query_str)

                tupples = cursor.fetchall()

                columns = [desc[0] for desc in cursor.description]
                df = pd.DataFrame(tupples, columns=columns)

                # Reorder columns to make 'title' the fourth column and 'url' the last column
                cols = df.columns.tolist()
                title_index = cols.index('title')
                url_index = cols.index('url')
                videoid_index = cols.index('videoid')
                cols = cols[:videoid_index + 1] + [cols[title_index]] + cols[videoid_index + 1:title_index] + cols[title_index + 1:url_index] + cols[url_index + 1:] + [cols[url_index]]
                df = df[cols]

                return df

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into responses table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection closed")
    return pd.DataFrame()  # Return an empty dataframe when an exception is raised
# ----------------------------------------------------------------------


def _test_get_videos(query):
    videos = get_videos(query)
    for video in videos:
        print(video.get_id())
        print(video.get_title())
        print(video.get_url())
        print(video.get_uploadtimestamp())
        print()


def _test():
    _test_get_videos('h')
    # _test_get_videos('highlight')
    # _test_get_videos('neutral')


def _test_insert_remove_video():
    title, url = "testtitle", "testurl"
    title1, url1 = "lol", "lol"
    id = 6
    insert_video(title, url)
    insert_video(title1, url1)
    delete_video(id)


def _testresponse():
    sessionid = 69
    vi, vf, vd, ai, af, ad = 1, 2, 3, 4, 5, 6
    insert_response(sessionid, vi, vf, vd, ai, af, ad)


def _testupdate():
    sessionid = 69
    feedback = "happy"
    update_response(sessionid, feedback)

# ----------------------------------------------------------------------


if __name__ == '__main__':
    _test()
    _test_insert_remove_video()
    _testresponse()
    _testupdate()
