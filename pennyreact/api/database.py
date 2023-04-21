#!/usr/bin/env python

# -----------------------------------------------------------------------
# admindatabase.py
# query: Andrew Hwang, Aetizaz Sameer
# -----------------------------------------------------------------------

import logging
import requests
import re
import psycopg2
import pandas as pd
import video as videomod
import response as responsemod
from datetime import datetime

# -----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'
_PORT = '5432'

# -----------------------------------------------------------------------
# timestamp
# Returns: the date and time of the timestamp
# -----------------------------------------------------------------------


def timestamp():
    return str(datetime.now().replace(microsecond=0))


# -----------------------------------------------------------------------
# get_video
# Gets the video with the given id
# Parameters: id -- an integer
# Returns: the video that matches the id
# -----------------------------------------------------------------------


def get_video(id):

    with psycopg2.connect(host=_HOST_URL,
                          database=_DATABASE,
                          user=_USERNAME,
                          password=_PASSWORD) as connection:
        with connection.cursor() as cursor:

            query_str = "SELECT * FROM videos"
            query_str += " WHERE id=(%s) ESCAPE '\\'"
            id = id.replace('_', '\\_').replace('%', '\\%')
            cursor.execute(query_str, (f'{id}',))

            table = cursor.fetchall()
            if len(table) == 0:
                return None

            row = table[0]
            video = videomod.Video(row[0], row[1], row[2], row[3])
            return video


# -----------------------------------------------------------------------
# get_videos
# Gets the videos that match the search terms.
# Parameters: query - a search term
# Returns: the videos that match the search term
# -----------------------------------------------------------------------


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


# -----------------------------------------------------------------------
# insert_video
# Accesses the database and returns the results of the query.
# Parameters: title - the title of the video to be added
#             url - the url of the video to be added
# Returns: the results of the query
# -----------------------------------------------------------------------


def insert_video(title, url):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:

                url = url.strip()
                logger = logging.getLogger('werkzeug')
                logger.info(url)
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

                video_url = match.group(0)

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


# -----------------------------------------------------------------------
# delete_video
# Accesses the database and returns the results of the query.
# Parameters: id - the id number of the video to be deleted
# Returns: the results of the query
# -----------------------------------------------------------------------


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
# Gets the responses that match the search terms.
# Parameters: query - a search term
# Returns: the videos that match the search term
# -----------------------------------------------------------------------


def get_responses():

    responses = []

    with psycopg2.connect(host=_HOST_URL,
                          database=_DATABASE,
                          user=_USERNAME,
                          password=_PASSWORD) as connection:
        with connection.cursor() as cursor:

            query_str = "SELECT * FROM responses"
            query_str += " ORDER BY id"
            cursor.execute(query_str)

            table = cursor.fetchall()
            for row in table:
                response = responsemod.Response(row[0], row[1], row[2],
                                                row[3], row[4], row[5],
                                                row[6], row[7], row[8],
                                                row[9])
                responses.append(response)

    return responses


# -----------------------------------------------------------------------
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
# -----------------------------------------------------------------------


def insert_response(sessionid, video_id, vi, vf, vd, ai, af, ad):
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
                record_to_insert = (sessionid, video_id, vi, vf, vd,
                                    ai, af, ad, timestamp())
                cursor.execute(postgres_insert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into responses table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into responses table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# -----------------------------------------------------------------------
# update_response
# Accesses the database and returns the results of the query.
# Parameters: sessionid - the session number
#             response - optional emotions associated with video
# Returns: the results of the query
# -----------------------------------------------------------------------


def update_response(sessionid, feedback):
    try:
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

    except (Exception, psycopg2.Error) as error:
        print("Error in update operation", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# -----------------------------------------------------------------------
# get_dataframe
# Connects to database and gets dataframe
# Parameters:
# Returns: the results of the query
# -----------------------------------------------------------------------


def get_dataframe():
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                query_str = "SELECT * FROM responses"
                cursor.execute(query_str)

            tupples = cursor.fetchall()
            cursor.close()

            df = pd.DataFrame(tupples)

            return df

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into responses table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


# -----------------------------------------------------------------------
# download_csv
# Connects to database and gets dataframe
# Parameters:
# Returns: the results of the query
# -----------------------------------------------------------------------


def download_csv():
    df = get_dataframe()
    df.head()
    df.to_csv(index=False)


# -----------------------------------------------------------------------


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

# -----------------------------------------------------------------------


if __name__ == '__main__':
    _test()
    _test_insert_remove_video()
    _testresponse()
    _testupdate()
