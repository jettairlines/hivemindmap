#!/usr/bin/env python3
import sys
import route.api
from app import app

if __name__ == '__main__':
    debug = sys.argv[-1] == '-d'
    app.run(debug=debug)
