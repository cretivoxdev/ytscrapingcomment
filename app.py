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
    # print(url)
    
    #syntax if in 1 line
    data = downloader.get_comments_from_url(url)
    # count = 0 
    data_comment , data_text, data_parsing = [], [], []
    for comment in data:
        # print(comment)
        data_comment.append(comment)
        data_text.append(comment["text"])
    # print(" ".join(data_text))
    data = {"text" : " ".join(data_text)}
    data_parsing.append(data)
    # print(data_parsing)
    parsing_json = json.dumps(data_parsing)
    comment_json = json.dumps(data_comment)
    parsing_file = open("./static/data_parsing.json" , "w")
    json_file = open("./static/data_comment.json","w")
    parsing_file.write(parsing_json)
    json_file.write(comment_json)
    parsing_file.close()
    json_file.close() 
        
    return render_template('index.html' , comments = data_comment[0])

if __name__ == "__main__":
    app.run(debug=True, port="1010")