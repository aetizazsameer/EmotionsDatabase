#!/usr/bin/env python

# ----------------------------------------------------------------------
# app.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import flask
import database
from video_selector import selector

# ----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build',
                  static_url_path='/')

# ----------------------------------------------------------------------


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/admin', methods=['GET'])
@app.route('/researcher', methods=['GET'])
@app.route('/participant', methods=['GET'])
@app.route('/participant/presurvey', methods=['GET'])
@app.route('/participant/video', methods=['GET'])
@app.route('/participant/postsurvey', methods=['GET'])
def index():
    response = app.send_static_file('index.html')
    response.set_cookie('last_query', flask.request.url)
    return response


# ----------------------------------------------------------------------

@app.route('/participant/get_URL', methods=['GET'])
def get_URL():
    url = selector()
    return flask.jsonify({'url': url})


@app.route('/searchresults', methods=['GET'])
def search_results():

    query = flask.request.args.get('query', '').strip()

    if query == '':
        videos = []
    else:
        videos = database.get_videos(query)

    videos = [video.to_dict() for video in videos]
    return flask.jsonify(videos)

@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = flask.request.get_json()
    title = data.get('title')
    url = data.get('url')
    success = database.insert_video(title, url)

    html_code = flask.render_template('video_insert.html',
                                      success=success)
    response = flask.make_response(html_code)
    return response
