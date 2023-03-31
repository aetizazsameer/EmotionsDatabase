DB_NAME = "emotionsdatabase"
DB_USER = "emotionsdatabase_user"
DB_PASS = "muO6WwujmxvrVuxwhYRcK1jOrQslGrTm"
DB_HOST = "dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com"
DB_PORT = "5432"

import psycopg2

try:
    connection = psycopg2.connect(user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT)

connection = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

cursor = connection.cursor()

cursor.execute("CREATE TABLE video (id, title, url, timestamp);")

cursor.

connection.commit()

cursor.close()
connection.close()