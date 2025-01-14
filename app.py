"""
flask_app.py
"""

import os
import json
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def render_home():
    return render_template('index.html')

@app.route('/resume/')
def view_resume():
    return send_from_directory('static/resume', 'MuenningJ_Resume.pdf')

@app.route('/classes/')
def render_classes():
    file_path = os.path.join('mysite', 'static', 'json', 'classes.json')
    with open(file_path) as file:
        classes = json.load(file)
    return render_template('classes.html', classes=classes)

@app.route('/connect_four/')
def render_connect_four():
    return render_template('connect_four.html')