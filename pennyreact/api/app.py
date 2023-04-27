#!/usr/bin/env python

# ----------------------------------------------------------------------
# app.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import flask
import flask_wtf.csrf
# import flask_talisman
import database
import auth
from video_selector import selector
import response_avg

# ----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build',
                  static_url_path='/')
csrf = flask_wtf.csrf.CSRFProtect(app)
# flask_talisman.Talisman(app)  # require HTTPS

# ----------------------------------------------------------------------


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/admin', methods=['GET'])
@app.route('/researcher', methods=['GET'])
@app.route('/participant', methods=['GET'])
@app.route('/participant/presurvey', methods=['GET'])
def index():
    flask.session['path'] = flask.request.path
    response = app.send_static_file('index.html')
    return response


# ----------------------------------------------------------------------


@app.route('/participant/video', methods=['GET'])
@app.route('/participant/postsurvey', methods=['GET'])
def participant_sequence():
    # sequence paths
    path = flask.request.path
    presurvey = '/participant/presurvey'
    video = '/participant/video'
    postsurvey = '/participant/postsurvey'

    # redirect to presurvey if it has not been completed
    if flask.session is None:
        return flask.redirect(presurvey)

    # existing session without path
    stored_path = flask.session.get('path')
    if stored_path is None:
        return flask.redirect(presurvey)

    # video without having completed presurvey
    if path == video and stored_path != presurvey:
        return flask.redirect(presurvey)

    # postsurvey without having completed video
    elif path == postsurvey and stored_path != video:
        return flask.redirect(presurvey)

    flask.session['path'] = path
    return index()

# ----------------------------------------------------------------------

@app.route('/login', methods=['GET'])
def login():
    return auth.login()


@app.route('/login/callback', methods=['GET'])
def callback():
    return auth.callback()


@app.route('/logoutapp', methods=['GET'])
def logoutapp():
    return auth.logoutapp()


@app.route('/logoutgoogle', methods=['GET'])
def logoutgoogle():
    return auth.logoutgoogle()


def authorize(username):
    if not database.is_authorized(username):
        html_code = 'You are not authorized to use this application.'
        response = flask.make_response(html_code)
        flask.abort(response)

# ----------------------------------------------------------------------


@app.route('/participant/get_URL', methods=['GET'])
def get_URL():
    url, id = selector()
    return flask.jsonify({'url': url, 'id': id})


@app.route('/api/videosearch', methods=['GET'])
def video_search():

    query = flask.request.args.get('query', '').strip()
    videos = database.get_videos(query)

    videos = [video.to_dict() for video in videos]
    return flask.jsonify(videos)


@app.route('/api/responseavg', methods=['GET'])
def response_search():

    responses = database.get_responses()
    sorted_responses = sorted(responses, key=lambda v: v._videoid)

    # split responses into subarrays by video id
    response_dict = {}
    for response in sorted_responses:
        videotitle = database.get_title(response._videoid)
        key = response._videoid, videotitle
        if key not in response_dict:
            response_dict[key] = []
        response_dict[key].append(response)

    # compute averages per subarray
    averages = []
    for (videoid, videotitle), subarray in response_dict.items():
        n = len(subarray)
        valence_initial = sum(v._valence_initial for v in subarray) / n
        valence_final = sum(v._valence_final for v in subarray) / n
        valence_delta = sum(v._valence_delta for v in subarray) / n
        arousal_initial = sum(v._arousal_initial for v in subarray) / n
        arousal_final = sum(v._arousal_final for v in subarray) / n
        arousal_delta = sum(v._arousal_delta for v in subarray) / n
        averages.append(response_avg.ResponseAvg(videoid, videotitle,
                                                 valence_initial, valence_final,
                                                 valence_delta, arousal_initial,
                                                 arousal_final, arousal_delta))

    for i in range(len(averages)):
        averages[i] = averages[i].to_dict()

    return flask.jsonify(averages)


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
