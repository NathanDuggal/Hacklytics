# Hackalytics 2023

Created in under 24 hours for the 2023 GT Data Science Hackathon.

Staryeast, a mood experience: ML model trained to generate music playlists based on the weather.

Using Google Trends, we downloaded data on the popularity of songs over time. We then matched each date to weather data to see how song popularity changes depending on weather conditions. Using a Kaggle dataset, we matched songs to 14 characteristics including danceability, tempo, explicitness, speachiness, and more. We then created a dataset mapping weather to song characteristics of the songs people listen to most in that type of weather. We trained a LSTM model to predict song characteristics based on the weather. The model is then fed current weather data in Atlanta and outputs song characteristics. We then used linear regression to match the predicted song characteristics to five songs out of a database of around 1 million songs.

Frontend in React and Node.js, backend in Python and Keras.

Devpost with demo: https://devpost.com/software/starryeast


<img width="1498" alt="Screenshot_2023-02-12_at_8 40 15_AM" src="https://user-images.githubusercontent.com/116393413/219295584-f7d773ce-9544-4b9f-909c-2db31410561a.png">

Contributers:
* Nathan Duggal
* Katherine Huang
* Pranav Tadepalli
* Sam Kim
