#!/usr/bin/env python

# ----------------------------------------------------------------------
# app.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import flask
# import flask_wtf.csrf
# import flask_talisman
import database
from video_selector import selector

# ----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build',
                  static_url_path='/')
# csrf = flask_wtf.csrf.CSRFProtect(app)
# flask_talisman.Talisman(app)  # require HTTPS

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
    url, id = selector()
    return flask.jsonify({'url': url, 'id': id})


@app.route('/api/videosearchid', methods=['GET'])
def video_search_byid():

    id = flask.request.args.get('id', '').strip()
    video = database.get_video(id)
    if video is None:
        return flask.jsonify(video)
    return flask.jsonify(video.to_dict())


@app.route('/api/videosearch', methods=['GET'])
def video_search():

    query = flask.request.args.get('query', '').strip()
    videos = database.get_videos(query)

    videos = [video.to_dict() for video in videos]
    return flask.jsonify(videos)


@app.route('/api/responsesearch', methods=['GET'])
def response_search():

    responses = database.get_responses()
    responses = [response.to_dict() for response in responses]
    return flask.jsonify(responses)


@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = flask.request.get_json()
    title = data.get('title')
    url = data.get('url')
    success = database.insert_video(title, url)

    # not displayed
    html_code = flask.render_template('video_insert.html',
                                      success=success)
    response = flask.make_response(html_code)
    return response


@app.route('/api/insert_response', methods=['POST'])
def insert_response_handler():
    # Handle the insertion of response into your database here
    data = flask.request.get_json()
    sessionid = data.get('sessionid')
    videoid = data.get('video_id')
    vi = data.get('valence_initial')
    vf = data.get('valence_final')
    vd = data.get('valence_delta')
    ai = data.get('arousal_initial')
    af = data.get('arousal_final')
    ad = data.get('arousal_delta')

    success = database.insert_response(
        sessionid, videoid, vi, vf, vd, ai, af, ad)

    # not displayed
    html_code = flask.render_template('response_insert.html',
                                      success=success)
    response = flask.make_response(html_code)
    return response


@app.route('/api/update_response', methods=['POST'])
def update_response_handler():
    # Handle the update of response into your database here
    data = flask.request.get_json()

    sessionid = data.get('sessionid')
    feedback = data.get('feedback')

    success = database.update_response(sessionid, feedback)

    # not displayed
    html_code = flask.render_template('response_insert.html',
                                      success=success)
    response = flask.make_response(html_code)
    return response
