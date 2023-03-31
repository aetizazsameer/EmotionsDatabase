#!/usr/bin/env python

# -----------------------------------------------------------------------
# database.py
# query: Aetizaz Sameer
# -----------------------------------------------------------------------

import video as videomod
import psycopg2

# -----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'

# -----------------------------------------------------------------------

def get_videos(query):

    videos = []

    with psycopg2.connect(host=_HOST_URL, database=_DATABASE,
                          user=_USERNAME, password=_PASSWORD) as conn:
        with conn.cursor() as cursor:

            query_str = "SELECT * FROM videos WHERE title ILIKE " +\
                "'%s' OR url ILIKE '%s'"
            cursor.execute(query_str, (query, query))

            table = cursor.fetchall()
            for row in table:
                print('33333')
                video = videomod.Video(row[1], row[2], row[3])
                videos.append(video)

    return videos

# -----------------------------------------------------------------------

def _test_get_videos(query):
    videos = get_videos(query)
    for video in videos:
        print(video.get_id)
        print(video.get_title())
        print(video.get_url())
        print(video.get_uploadtimestamp())
        print()


def _test():
    _test_get_videos('h')
    # _test_get_videos('highlight')
    # _test_get_videos('neutral')


if __name__ == '__main__':
    _test()
