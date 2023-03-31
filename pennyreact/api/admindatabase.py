import psycopg2
import sqlite3
import contextlib
import sys
import video as videomod


_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'


def insert_video(search, inputs):
    print("stonks")
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port="5432") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                # cursor.execute(search, inputs)

                # query_str = "SELECT * FROM videos WHERE title ILIKE " +\
                #     "%(query)s OR url ILIKE %(query)s"
                # cursor.execute(query_str, {'query': query})

                # table = cursor.fetchall()
                # print(table)

                postgres_insert_query = """ INSERT INTO videos (title, url, uploadtimestamp) VALUES (%s, %s, %s)"""
                record_to_insert = ("title", "url", "timestamp")
                cursor.execute(postgres_insert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into mobile table")
    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into video table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


def test():
    insert_video(search=1231, inputs=83818543)


if __name__ == '__main__':
    test()
