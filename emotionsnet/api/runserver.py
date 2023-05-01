#!/usr/bin/env python

# ----------------------------------------------------------------------
# runserver.py
# Author: Tyler Vu, Aetizaz Sameer, Andrew Hwang
# ----------------------------------------------------------------------

import sys
import argparse
import app

#-----------------------------------------------------------------------


# parse commandline arguments
def _parse():
    parser = argparse.ArgumentParser(prog=sys.argv[0],
                                     description='Client for the \
                                     EmotionsNet application')
    parser.add_argument("port", help="the port at which the server \
                        should listen", type=int)
    return parser.parse_args().port


# parse port form commandline arg and run registrar couse offerings
# web app
def main():
    port = _parse()

    try:
        app.app.run(host='0.0.0.0', port=port, debug=True)

    except Exception as ex:
        print(f'{sys.argv[0]}: {ex}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
