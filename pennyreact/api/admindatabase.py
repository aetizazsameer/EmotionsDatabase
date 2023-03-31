import psycopg2
import sqlite3
import contextlib
import sys
from .extensions import db


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))

def access_database(search, inputs):
    try:
        with psycopg2.connect(database="emotionsdatabase",
                              host="dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com",
                              user="emotionsdatabase_user",
                              password="muO6WwujmxvrVuxwhYRcK1jOrQslGrTm",
                              port="5432") as connection:
            with contextlib.closing(connection.cursor()) as cursor:
                cursor.execute(search, inputs)

                postgres_instert_query = """ INSERT INTO (id, title, url, timestamp) VALUES (%s, %s, %s, %s)"""
                record_to_insert = (1, "hello", "aasdjfas", 50)
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

