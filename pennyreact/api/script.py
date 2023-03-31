DB_NAME = "emotionsdatabase"
DB_USER = "emotionsdatabase_user"
DB_PASS = "muO6WwujmxvrVuxwhYRcK1jOrQslGrTm"
DB_HOST = "dpg-cgifmlpr8t1g7lp9krfg-a.ohio-postgres.render.com"

import psycopg2

connection = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

cursor = connection.cursor()

cursor.execute("CREATE TABLE video (id, title, url, timestamp);")

cursor.

connection.commit()

cursor.close()
connection.close()