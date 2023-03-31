#!/usr/bin/env python

# -----------------------------------------------------------------------
# app.py
# Author: Bob Dondero
# -----------------------------------------------------------------------

import flask
import database
from flask import Flask, request
import admindatabase

# -----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build',
                  static_url_path='/')

# -----------------------------------------------------------------------


@app.route('/')
def index():
    return app.send_static_file('index.html')

# -----------------------------------------------------------------------


@app.route('/searchresults', methods=['GET'])
def search_results():

    author = flask.request.args.get('author')
    if author is None:
        author = ''
    author = author.strip()

    if author == '':
        books = []
    else:
        books = database.get_books(author)  # Exception handling omitted

    html_code = flask.render_template('books.html', books=books)
    response = flask.make_response(html_code)
    return response


@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = request.get_json()
    title = data.get('title')
    url = data.get('url')
    email = data.get('email')
    admindatabase.insert_video(title, url)
    print('lsakjflkasfjklsadjf')
