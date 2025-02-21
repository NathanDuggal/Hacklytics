import logo from './logo.svg';
import weatherIcon from './RedPartialCloud.png'
import './App.css';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateTime from './DateTime';
import react, { useEffect, useState } from "react";
import { cardActionsClasses } from '@mui/material';

var videos = [];

export default function App(){
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [weatherType, setWeatherType] = useState("T.B.D.");
  const [temp, setTemp] = useState("default");
  
  const updateData = async () => {
    console.log("Fetching");
    await fetch("http://127.0.0.1:8004/getWeather")
      .then((response) => response.json())
      .then((data) => {
        const weatherData = JSON.parse(data[0].weather);
        console.log(data);
        setWeatherType(weatherData.conditions[0]);

        const temp = weatherData.temp[0];
        
        if (temp < 40) {
          root.style.setProperty('--color1','#c2c3ff'); //blue white purple
          root.style.setProperty('--color2','#c2d6ff'); //blue more green
        } else if (temp >= 40 && temp < 50) {
          root.style.setProperty('--color1','#b2dcf7'); //blue more more green
          root.style.setProperty('--color2','#b2eff7'); //blue more more more green
        } else if (temp >= 50 && temp < 60) {
          root.style.setProperty('--color1','#ccfcea'); //green
          root.style.setProperty('--color2','#ccfcd2'); //yellow green
        } else if(temp >= 60 && temp < 80) {
          root.style.setProperty('--color1','#eafccc'); //yellow
          root.style.setProperty('--color2','#ffdebd'); //orange
        } else {
          root.style.setProperty('--color1','#fdc9ff'); //blue for else
          root.style.setProperty('--color2','#cbc9ff'); 
        }

        console.log(data.names);
        const videoData = data[1].videos;
        const nameData = data[2].names;

        for(var i=0; i < nameData.length; i++) {
          console.log(nameData[i]);
          document.getElementById("song" + i).innerHTML = nameData[i];
        }

        videos = videoData;

        setVideo(0);
      })
      .catch(() => {
        setWeatherType("ERROR");
      });
      // .then(() => fetch("http://127.0.0.1:8004/getVideos")
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log(videos);
      // })
      // .catch(() => {
      //   setWeatherType("ERROR");
      // }));
  };

  const setVideo = (val) => {
    console.log(videos);
    document.getElementById('video-window').src = "https://www.youtube.com/embed/" + videos[val];
    console.log("https://www.youtube.com/embed/" + videos[val]);
  }
  
  var root = document.querySelector(':root');
  
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet"></link>


        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;800&display=swap" rel="stylesheet"></link>

        <h1 className="title">staryeast 🎶</h1> 
        <br></br>
        <Container className='app-grid'>
          <Row className='grid-row justify-content-md-center'>
            <Col md={1}>
              <div className='condition-container'>
                  <p className='condition-title' id='weatherid'>Weather</p>
                  <img  src={weatherIcon} id='weatherOnly'className='weather'/>
                <p className='condition-title-weather' id='weatherType'>{weatherType}</p>
              </div>
            </Col>
            <Col md={1}>
              <div className='condition-container'>
                <p className='condition-title'>Time</p>
                <DateTime className='time'></DateTime>
              </div>
            </Col>
            <Col md={1}>
               <div className='condition-container'>
                <p className='condition-title'>Location</p>
                <p className='place'>Atlanta,</p>
                <p className='place'>GA</p>
               </div>
            </Col>
            <Col md={2}>
              <button type="menuButton" className='button menuButton' onClick={updateData}>Update</button>
            </Col>
          </Row>
          <Row>
            <Col className='playlist-preview' md={5}>
              <div className='current-song'>
                <iframe id="video-window" width="600" height="350" src="https://www.youtube.com/embed/videoseries?list=PL4jEyp32wP5sa2Y_rotcEZnVjCTuqqKwE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </Col>
            <Col className='playlist-selector' md={4}>
              <button id="song0" type="button" className='button' onClick={() => {setVideo(0)}}>Press Update to Load Songs</button>
              <button id="song1" type="button" className='button' onClick={() => {setVideo(1)}}></button>
              <button id="song2" type="button" className='button' onClick={() => {setVideo(2)}}></button>
              <button id="song3" type="button" className='button' onClick={() => {setVideo(3)}}></button>
              <button id="song4" type="button" className='button' onClick={() => {setVideo(4)}}></button>
            </Col>
          </Row>
          <h1 className='songs-title'> Made with ♥ by Bob...</h1>
        </Container>
      </header>
    </div>
  );
}