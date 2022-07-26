from flask import Flask, redirect, request, jsonify, render_template, url_for, session, Response
from ytcvox import YoutubeCommentDownloader
import json


app=Flask(__name__)

downloader = YoutubeCommentDownloader()

@app.route('/') 
def index():
    return render_template('index.html')

@app.route('/youtube', methods = ["POST","GET"])
def youtube():
    url = str(request.form.get("url"))
    print(url)
    
    #syntax if in 1 line
    data = downloader.get_comments_from_url(url)
    count = 0 
    data_comment = []
    for comment in data:
        print(comment)
        data_comment.append(comment)
    comment_json = json.dumps(data_comment)
    json_file = open("data_comment.json","w")
    json_file.write(comment_json)
    json_file.close() 
        
    return render_template('index.html' , comments = data_comment[0])

if __name__ == "__main__":
    app.run(debug=True)