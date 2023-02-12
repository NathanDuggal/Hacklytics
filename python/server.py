import flask as flask
from flask import Flask
import requests as requests
import pandas as pd
import random
import numpy as np
from tensorflow import keras
from youtubesearchpython import VideosSearch

model = keras.models.load_model("awful_yeast")

# from youtubesearchpython.__future__ import VideosSearch

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


maximum = np.array([9.770e+01, 7.710e+01, 8.580e+01, 1.063e+02, 7.710e+01, 9.210e+01,
       7.360e+01, 9.740e+01, 1.834e+00, 1.000e+02, 8.750e+01, 6.000e-01,
       5.000e-01, 5.170e+01, 2.640e+01, 3.571e+02, 1.000e+02, 9.900e+00,
       5.587e+02, 4.800e+01, 1.000e+01, 1.000e+00])
minimum = np.array([25.7,  7.9, 16.1, 15. , -8.8,  3.1,  2.4, 28.3,  0. ,  0. ,  0. ,
        0. ,  0. ,  4.7,  4.6,  0.5,  0. ,  2.1, 16. ,  1.4,  1. ,  0. ])



def normalize(values):
    return (values - minimum)/(maximum - minimum)



@app.route("/testing")
def test():
    songs_file= 0 #raw data from the tracks
    with open("tracks_features.csv",'r') as songs:
        songs_file = songs.read()
        
    #find a random 10000 songs out of the 1 million song dataset (bc otherwise too slow)
    songs_file = random.sample(songs_file.split('\n')[1:], 10000)
        
    #put raw data from tracks into list named songs
    songs = []
    for line in songs_file:
        line_end = line.split("True,")[-1] if 'True' in line else line.split("False,")[-1]
        line = line.split(",")

        songs.append(line_end.split(',')[:-1])
        

    #visualize as the physical distance between each point in an x dimensional world, where x is number of attributes
    #find the smallest distance

    smallest = 10000000
    smallest_index = 0

    response = requests.request("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/atlanta?unitGroup=us&include=current&key=R9ZCEVVMLR3LJL43H33SFS4G4&contentType=json")
    if response.status_code!=200:
        print('Unexpected Status code: ', response.status_code)
    jsonData = response.json()

    key_list = "tempmax,tempmin,temp,feelslikemax,feelslikemin,feelslike,dew,humidity,precip,precipprob,precipcover,snow,snowdepth,windgust,windspeed,winddir,cloudcover,visibility,solarradiation,solarenergy,uvindex,moonphase".split(",")
    my_dict = jsonData["days"][0] #get value of the key called "days". Get 0th value of all the days in the day value field (current day)
    my_list = []

    for key in key_list:
        my_list.append(my_dict[key])

    b = my_list
    #b = list(map(float, "90.4,73.2,79.7,96.3,73.2,81.5,71.7,77.9,0.08,100.0,8.33,0.0,0.0,29.9,11.8,115.6,39.1,9.9,513.6,44.6,5.0,0.25".split(",")))
    #b = np.array(list(b)) #turning the data we're trying to match (b) into np vector
    b = model.predict(np.array([np.array(normalize(b))])) 

    dist_list = []

    for c,i in enumerate(songs):
            try:
                a = np.array(list(map(float,i))) #turning song into np vector

                dist = np.linalg.norm(a-b)
                #print(dist)

                dist_list.append((c,dist))
            except:
                pass
    
    dist_list.sort(key=lambda x: x[1])
    indexes = [e[0] for e in dist_list[:5]]
    return (str([songs_file[index+1].split(',')[1] for index in indexes]))


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