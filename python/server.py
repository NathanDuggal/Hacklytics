import flask as flask
from flask import Flask
import requests as requests
import pandas as pd
from youtubesearchpython import VideosSearch
# from youtubesearchpython.__future__ import VideosSearch

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/getWeather")
def giveWeatherData():
    
    print("Got request!")
    
    response = requests.request("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/atlanta?unitGroup=us&include=current&key=R9ZCEVVMLR3LJL43H33SFS4G4&contentType=json")
    if response.status_code!=200:
        print('Unexpected Status code: ', response.status_code)
    jsonData = response.json()
    import pandas as pd #pandas imported with alias!

    key_list = "datetime,tempmax,tempmin,temp,feelslikemax,feelslikemin,feelslike,dew,humidity,precip,precipprob,precipcover,preciptype,snow,snowdepth,windgust,windspeed,winddir,cloudcover,visibility,solarradiation,solarenergy,uvindex,severerisk,sunrise,sunset,moonphase,conditions,description,icon,stations".split(",")
    my_dict = jsonData["days"][0] #get value of the key called "days". Get 0th value of all the days in the day value field (current day)
    my_list = []

    for key in key_list:
        my_list.append(my_dict[key])

    df_q = pd.DataFrame (my_list) #data frame for the query
    df_q = df_q.T #transposed

    df_q = df_q.rename(columns={0: "datetime", 1: "tempmax", 2: "tempmin", 3: "temp", 4:"feelslikemax", 5: "feelslikemin", 6: "feelslike", 7: "dew", 8:"humidity", 9:"precip", 10:"precipprob", 11: "precipcover",
                                12:"preciptype", 13:"snow", 14:"snowdepth", 15:"windgust", 16:"windspeed", 17:"winddir",
                                18:"cloudcover", 19:"visibility",20:"solarradiation",21:"solarenergy",22:"uvindex",23:"severerisk",
                                24:"sunrise",25:"sunset",26:"moonphase", 27:"conditions",28:"description",29:"icon", 30:"stations"  })

    response = flask.jsonify({'weather': df_q.to_json()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    # print(df_q.to_json())
    
    return response

@app.route("/getVideos")
def getYoutubeSearch():
    # Get this from somewhere
    video_names = ['Hello', 'Ghost Waltz']
    
    videos = []
    for name in video_names :
        videosSearch = VideosSearch(name, limit = 2)
        videos.append(videosSearch.result()['result'][0]['id'])
    
    response = flask.jsonify({'videos': videos})
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

    
# videosSearch = VideosSearch("Hello", limit = 2)
# print(videosSearch.result()['result'][0]['id'])

# print(giveWeatherData())

app.run(debug=True, use_reloader=False, port=8004)