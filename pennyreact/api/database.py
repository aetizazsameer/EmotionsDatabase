#!/usr/bin/env python

#-----------------------------------------------------------------------
# database.py
# query: Aetizaz Sameer
#-----------------------------------------------------------------------

import video as videomod
import psycopg2

#-----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'

#-----------------------------------------------------------------------

def get_videos(query):

    videos = []

    with psycopg2.connect(host=_HOST_URL, database=_DATABASE,
        user=_USERNAME, password=_PASSWORD) as conn:

        with conn.cursor() as cursor:

            query_str = "SELECT id, title, url FROM videos "
            query_str += "WHERE title LIKE ? OR url LIKE ?"
            cursor.execute(query_str, [query+'%']*2)

            table = cursor.fetchall()
            for row in table:
                video = videomod.Video(row[0], row[1], row[2], row[3])
                videos.append(video)

    return videos

#-----------------------------------------------------------------------

def _testhelp(query):
    videos = get_videos(query)
    for video in videos:
        print(video.get_id)
        print(video.get_title())
        print(video.get_url())
        print(video.get_uploadtimestamp())
        print()

def _test():
    _testhelp('highlight')
    _testhelp('neutral')

if __name__ == '__main__':
    _test()
