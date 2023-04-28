#!/usr/bin/env python

# ----------------------------------------------------------------------
# auth.py
# Author: Andrew Hwang, Aetizaz Sameer, Tyler Vu
# ----------------------------------------------------------------------

import os
import json
import requests
import flask
import oauthlib.oauth2

# ----------------------------------------------------------------------

GOOGLE_DISCOVERY_URL = ()

GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
GOOGLE_CLIENT_SECRET = os.environ['GOOGLE_CLIENT_SECRET']

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
client = oauthlib.oauth2.WebApplicationClient(GOOGLE_CLIENT_ID)

# ----------------------------------------------------------------------

def login():

    # Determine the URL for Google login.
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    authorization_endpoint = (google_provider_cfg['authorization_endpoint'])

    # Construct the request URL for Google login, providing scopes
    # to fetch the user's profile data.
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=flask.request.base_url + '/callback',
        scope=['openid', 'email', 'profile'],
        )

    # Redirect to the request URL.
    return flask.redirect(request_uri)

# ----------------------------------------------------------------------

def callback():

    # Get the authorization code that Google sent.
    code = flask.request.args.get('code')

    # Determine the URL to fetch tokens that allow the application to
    # ask for the user's profile data.
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    token_endpoint = google_provider_cfg['token_endpoint']

    # Construct a request to fetch the tokens.
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=flask.request.url,
        redirect_url=flask.request.base_url,
        code=code
    )

    # Fetch the tokens.
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
    )

    # Parse the tokens.
    client.parse_request_body_response(
        json.dumps(token_response.json()))

    # Using the tokens, fetch the user's profile data,
    # including user's Google profile image and email address.
    userinfo_endpoint = google_provider_cfg['userinfo_endpoint']
    uri, headers, body = client.add_token(userinfo_endpoint)

    userinfo_response = requests.get(uri, headers=headers, data=body)

    # Save user profile data in the session.
    flask.session['sub'] = userinfo_response.json()['sub']
    flask.session['name'] = userinfo_response.json()['name']
    flask.session['given_name'] = userinfo_response.json()['given_name']
    flask.session['family_name'] = userinfo_response.json()['family_name']
    flask.session['picture'] = userinfo_response.json()['picture']
    flask.session['email'] = userinfo_response.json()['email']
    flask.session['verified'] = userinfo_response.json()['verified']
    flask.session['locale'] = userinfo_response.json()['locale']

    return flask.redirect(flask.url_for('index'))

# ----------------------------------------------------------------------

def logoutapp():
    # Log out of application.
    flask.session.clear()
    html_code = flask.render_template('loggedout.html')

    response = flask.make_response(html_code)
    return response

# ----------------------------------------------------------------------

def logoutgoogle():
    # Log out of application.
    flask.session.clear()

    # Log out of Google.
    flask.abort(flask.redirect(
        'https://mail.google.com/mail/u/0/?logout&hl=en'))

# ----------------------------------------------------------------------

def authentication():
    if 'email' not in flask.session:
        flask.abort(flask.redirect(flask.url_for('login')))

    return flask.session.get('email')