#!/usr/bin/env python

# ----------------------------------------------------------------------
# app.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import flask
import database
import admindatabase

# ----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build/static',
                  static_url_path='/')

# ----------------------------------------------------------------------


@app.route('/')
def index():
    return app.send_static_file('index.html')

# ----------------------------------------------------------------------


@app.route('/searchresults', methods=['GET'])
def search_results():

    query = flask.request.args.get('query', '').strip()

    if query == '':
        videos = []
    else:
        videos = database.get_videos(query) # Exception handling omitted

    html_code = flask.render_template('videos.html', videos=videos)
    response = flask.make_response(html_code)
    return response


@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = flask.request.get_json()
    title = data.get('title')
    url = data.get('url')
    admindatabase.insert_video(title, url)

@app.route('/api/retrieve_video', methods=['GET'])
def retrieve_video_handler():
    query = flask.request.args.get('query')
    # TODO
