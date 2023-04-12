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
                  static_folder='../build',
                  static_url_path='/')

# ----------------------------------------------------------------------


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/admin', methods=['GET'])
@app.route('/researcher', methods=['GET'])
@app.route('/participant', methods=['GET'])
def index():
    return app.send_static_file('index.html')


# ----------------------------------------------------------------------


@app.route('/participant/presurvey', methods=['GET'])
def presurvey():

    html_code = flask.render_template('presurvey.html')
    response = flask.make_response(html_code)
    response.set_cookie('last_query', flask.request.url)

    return response


@app.route('/paricipant/video', methods=['GET'])
def participant_video():
    html_code = flask.render_template('participant_video.html')
    response = flask.make_response(html_code)
    response.set_cookie('last_query', flask.request.url) 

    return response


@app.route('/paricipant/postsurvey', methods=['GET'])
def postsurvey():
    html_code = flask.render_template('postsurvey.html')
    response = flask.make_response(html_code)
    response.set_cookie('last_query', flask.request.url) 

    return response


@app.route('/searchresults', methods=['GET'])
def search_results():

    query = flask.request.args.get('query', '').strip()

    if query == '':
        videos = []
    else:
        videos = database.get_videos(query)  # Exception handling omitted

    html_code = flask.render_template('videos.html', videos=videos)
    response = flask.make_response(html_code)
    return response


@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = flask.request.get_json()
    title = data.get('title')
    url = data.get('url')
    success = admindatabase.insert_video(title, url)

    html_code = flask.render_template('video_insert.html',
                                      success=success)
    response = flask.make_response(html_code)
    return response
