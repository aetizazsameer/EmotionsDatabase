#!/usr/bin/env python

# ----------------------------------------------------------------------
# app.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import os
import flask
import io
# import flask_wtf.csrf
# import flask_talisman
import database
import auth
from video_selector import selector
import json
from datetime import datetime

# ----------------------------------------------------------------------

app = flask.Flask(__name__,
                  template_folder='.',
                  static_folder='../build',
                  static_url_path='/')
# csrf = flask_wtf.csrf.CSRFProtect(app) # conflicts with participant
# flask_talisman.Talisman(app)  # require HTTPS (use only in production)
app.secret_key = os.environ['SECRET_KEY']

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


def authorize(username, path):
    if not database.is_authorized(username, path):
        html_code = f'You are not authorized to use this application, {username}'
        response = flask.make_response(html_code)
        flask.abort(response)

# ----------------------------------------------------------------------


@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/participant', methods=['GET'])
@app.route('/participant/presurvey', methods=['GET'])
def index():
    flask.session['path'] = flask.request.path
    response = app.send_static_file('index.html')
    return response


@app.route('/admin', methods=['GET'])
@app.route('/researcher', methods=['GET'])
def admin():
    path = flask.request.path

    username = auth.authentication()
    authorize(username, path)

    flask.session['path'] = path
    flask.session['username'] = username
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

    elif path == postsurvey:
        # postsurvey without having completed video
        if stored_path != video:
            return flask.redirect(presurvey)
        # postsurvey with modified session cookie
        if not (flask.session.get('videoid') and \
                flask.session.get('row') and flask.session.get('col')):
            return flask.redirect(presurvey)

    flask.session['path'] = path
    return index()

# ----------------------------------------------------------------------


@app.route('/api/insert_coord', methods=['POST'])
def insert_coord_cookie():
    data = json.loads(flask.request.json['data'])

    flask.session['row'] = data['row']
    flask.session['col'] = data['col']
    return 'Saved selection coordinates'


@app.route('/api/get_coord', methods=['GET'])
def get_coord_cookie():
    return flask.jsonify({
        'row': flask.session.get('row'),
        'col': flask.session.get('col')
    })


@app.route('/api/get_videoid', methods=['GET'])
def get_videoid_cookie():
    return flask.jsonify({
        'videoid': flask.session.get('videoid'),
    })


@app.route('/api/remove_cookies', methods=['POST'])
def remove_coord_cookie():
    if flask.session.pop('row', None) and \
            flask.session.pop('col', None) and \
            flask.session.pop('videoid', None):
        return 'Removed selection coordinates and videoid'
    return 'Error removing selection coordinates and/or videoid'


# ----------------------------------------------------------------------


@app.route('/api/get_URL', methods=['GET'])
def get_URL():
    url, id = selector()
    flask.session['videoid'] = id
    return flask.jsonify({'url': url, 'id': id})


@app.route('/api/videosearch', methods=['GET'])
def video_search():

    query = flask.request.args.get('query', '').strip()
    videos = database.get_videos(query)

    videos = [video.to_dict() for video in videos]
    return flask.jsonify(videos)


@app.route('/api/video_data', methods=['GET'])
def response_search():
    responses = database.get_responses()
    return flask.jsonify(responses)


@app.route('/api/responses/<int:video_id>', methods=['GET'])
def response_search_individual(video_id):
    responses = database.get_responses_individual(video_id)
    return flask.jsonify(responses)


@app.route('/api/insert_video', methods=['POST'])
def insert_video_handler():
    # Handle the insertion of video into your database here
    data = flask.request.get_json()
    title = data.get('title')
    url = data.get('url')
    success = database.insert_video(title, url)

    if success:
        return flask.make_response('SUCCESS')
    return flask.make_response('FAILED')


@app.route('/api/insert_response', methods=['POST'])
def insert_response_handler():
    # Handle the insertion of response into your database here
    data = flask.request.get_json()
    videoid = data.get('video_id')
    vi = data.get('valence_initial')
    vf = data.get('valence_final')
    vd = data.get('valence_delta')
    ai = data.get('arousal_initial')
    af = data.get('arousal_final')
    ad = data.get('arousal_delta')

    success = database.insert_response(
        videoid, vi, vf, vd, ai, af, ad)
    database.update_sum(videoid, ai, vi, af, vf, ad, vd)

    if success:
        return flask.make_response('SUCCESS')
    return flask.make_response('FAILED')


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


@app.route('/api/downloadcsv', methods=['GET'])
def download_csv():
    df = database.get_dataframe()
    csv_data = df.to_csv(index=False)

    # Create a CSV file in memory
    csv_file = io.StringIO(csv_data)

    # Serve the CSV file as a response
    response = flask.make_response(csv_file.getvalue())
    filename = f'emotionsnet_{datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.csv'
    response.headers['Content-Disposition'] = f'attachment; filename={filename}'
    response.headers['Content-Type'] = 'text/csv'
    response.headers["x-filename"] = filename
    response.headers["Access-Control-Expose-Headers"] = 'x-filename'

    return response
