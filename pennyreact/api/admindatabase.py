#!/usr/bin/env python

# -----------------------------------------------------------------------
# admindatabase.py
# query: Andrew Hwang, Aetizaz Sameer
# -----------------------------------------------------------------------

import requests
import re
import psycopg2
from datetime import datetime

# -----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'
_PORT = '5432'

#-----------------------------------------------------------------------
# timestamp
# Returns: the date and time of the timestamp
#-----------------------------------------------------------------------

def timestamp():
    return str(datetime.now().replace(microsecond=0))

#-----------------------------------------------------------------------
# insert_video
# Accesses the database and returns the results of the query.
# Parameters: title - the title of the video to be added
#             url - the url of the video to be added
# Returns: the results of the query
#-----------------------------------------------------------------------

def insert_video(title, url):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:

                # extract video direct link from hosted link
                response = requests.get(url).text
                match = re.search('<meta property="og:video:secure_url" content="(.*?)">', response)
                video_url = match.group(1)

                postgres_insert_query = """ INSERT INTO videos (title, url, uploadtimestamp) VALUES (%s, %s, %s)"""
                record_to_insert = (title, video_url, timestamp())
                cursor.execute(postgres_insert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into video table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into video table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

#-----------------------------------------------------------------------
# delete_video
# Accesses the database and returns the results of the query.
# Parameters: id - the id number of the video to be deleted
# Returns: the results of the query
#-----------------------------------------------------------------------

def delete_video(id):
    try:
        with psycopg2.connect(database=_DATABASE, host=_HOST_URL,
                              user=_USERNAME, password=_PASSWORD,
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

#-----------------------------------------------------------------------

def _test():
    title, url = "testtitle", "testurl"
    title1, url1 = "lol", "lol"
    id = 6
    insert_video(title, url)
    insert_video(title1, url1)
    delete_video(id)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    _test()
