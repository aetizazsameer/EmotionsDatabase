import psycopg2
from datetime import datetime

# -----------------------------------------------------------------------

_HOST_URL = 'dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com'
_DATABASE = 'emotionsdatabase'
_USERNAME = 'emotionsdatabase_user'
_PASSWORD = 'muO6WwujmxvrVuxwhYRcK1jOrQslGrTm'
_PORT = '5432'

# -----------------------------------------------------------------------


def timestamp():
    return str(datetime.now().replace(microsecond=0))


def insert_video(title, url):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port=_PORT) as connection:
            with connection.cursor() as cursor:
                postgres_insert_query = """ INSERT INTO videos (title, url, uploadtimestamp) VALUES (%s, %s, %s)"""
                record_to_insert = (title, url, timestamp())
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


def delete_video(title):
    try:
        with psycopg2.connect(database=_DATABASE,
                              host=_HOST_URL,
                              user=_USERNAME,
                              password=_PASSWORD,
                              port="5432") as connection:
            with connection.cursor() as cursor:
                postgres_delete_query = """ DELETE from videos where id = %s"""
                cursor.execute(postgres_delete_query, (title))

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


def test():
    title, url = "testtitle", "testurl"
    title1, url1 = "lol", "lol"
    insert_video(title, url)
    insert_video(title1, url1)
    delete_video(title1)


if __name__ == '__main__':
    test()
