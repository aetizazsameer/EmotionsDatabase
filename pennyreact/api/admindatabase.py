import psycopg2
import sqlite3
import contextlib
import sys

def insert_video(search, inputs):
    try:
        with psycopg2.connect(database="emotionsdatabase",
                              host="dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com",
                              user="emotionsdatabase_user",
                              password="muO6WwujmxvrVuxwhYRcK1jOrQslGrTm",
                              port="5432") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                cursor.execute(search, inputs)

                postgres_instert_query = """ INSERT INTO videos (title, url, timestamp) VALUES (%s, %s, %s)"""
                record_to_insert = ("hello", "aasdjfas", 50)
                cursor.execute(postgres_instert_query, record_to_insert)

                connection.commit()
                count = cursor.rowcount
                print(count, "Record inserted successfully into mobile table")
    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into mobile table", error)

    finally:
        # close database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

def main():
    insert_video(search=1231, inputs=83818543)