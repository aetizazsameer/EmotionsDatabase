import flask
import admindatabase

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    query = ('', '', '', '')

    