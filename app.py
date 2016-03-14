#!/usr/bin/env python3
from flask import Flask
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

# TODO: initialize with some data
def init():
    return []
