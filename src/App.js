import logo from './logo.svg';
import weatherIcon from './PartialClouds.png'
import './App.css';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateTime from './DateTime';
import react, { useEffect, useState } from "react";
import { cardActionsClasses } from '@mui/material';

// import Grid from './Grid';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';

// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// const NUM_COLUMNS = 4;
// const COLUMNS_PER_BOX = 1;
// const NUM_BOXES = 28;

// const Item = function Item(props) {
//   const onClick = event => {
//     console.log(props.index);
//     let thisItem = document.getElementById(String(props.index));
//     console.log(thisItem.style.backgroundColor);
//     let toggle = String(thisItem.style.backgroundColor) === "rgb(255, 255, 255)" || String(thisItem.style.backgroundColor) == "";
//     for (let i = Number(props.index) % NUM_COLUMNS; i < NUM_BOXES; i += NUM_COLUMNS) {
//       document.getElementById(String(i)).style.backgroundColor = "#FFFFFF";
//     }
//     if (toggle) {
//       thisItem.style.backgroundColor = "#000000"; 
//     }
//   }

//   return <div id={props.index} className='item' onClick={onClick}>{props.index}</div>
// }

// console.log("API" + process.env.YOUTUBE_API_KEY);

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
  // const [videos, setVideos] = useState("TBD")
  var videos = [];

  const updateData = () => {
    console.log("Fetching");
    fetch("http://127.0.0.1:8004/getWeather")
      .then((response) => response.json())
      .then((data) => {
        const weatherData = JSON.parse(data.weather);
        console.log(data);
        setWeatherType(weatherData.conditions[0]);
        // setTemp(jsonData.temp[0]);
        // const temp = Number(jsonData.temp[0]);
        
        if (temp < 20) {
          root.style.setProperty('--color1','#c2c3ff'); //blue white purple
          root.style.setProperty('--color2','#c2d6ff'); //blue more green
        } else if (temp >= 20 && temp < 50) {
          root.style.setProperty('--color1','#b2dcf7'); //blue more more green
          root.style.setProperty('--color2','#b2eff7'); //blue more more more green
        } else if (temp >= 50 && temp < 70) {
          root.style.setProperty('--color1','#ccfcea'); //green
          root.style.setProperty('--color2','#ccfcd2'); //yellow green
        } else if(temp >= 70 && temp < 90) {
          root.style.setProperty('--color1','#eafccc'); //yellow
          root.style.setProperty('--color2','#ffdebd'); //orange
        } else {
          root.style.setProperty('--color1','#ffbdbd'); //red orange     
          root.style.setProperty('--color2','#fa96af'); //red pink
        }
      })
      .catch(() => {
        setWeatherType("ERROR");
      });

    fetch("http://127.0.0.1:8004/getVideos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.videos);
        const videoData = data.videos;
        // setVideos(videoData);
        videos = videoData;
        console.log(videos);
      })
      .catch(() => {
        setWeatherType("ERROR");
      });
  };

  const setVideo = (val) => {
    // console.log("here")
    // console.log(this.id);
    // console.log(val);
    console.log(videos[val]);
    document.getElementById('video-window').src = "https://youtu.be/" + videos[val];
  }
  
  var root = document.querySelector(':root');
  
  return (
    <div className="App">
      {/* <header>
        Spotify Music Maker
      </header> */}
      
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet"></link>


        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;800&display=swap" rel="stylesheet"></link>

        <h1 className="title" >staryeast</h1> 
        <br></br>
        <Container className='app-grid'>
          <Row className='grid-row justify-content-md-center'>
            <Col md={1}>
              <div className='condition-container'>
                  <p className='condition-title' id='weatherid'>Weather</p>
                  <img src={weatherIcon} id='weatherOnly'className='weather'/>
                <p id='weatherType'>{weatherType}</p>
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
              <button type="button" className='button' onClick={updateData}>Update</button>
            </Col>
          </Row>
          <Row>
            <Col className='playlist-preview' md={5}>
              <div className='current-song'>
                <iframe id="video-window" width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL4jEyp32wP5sa2Y_rotcEZnVjCTuqqKwE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </Col>
            <Col className='playlist-selector' md={4}>
              <button type="button" className='button' onClick={() => {setVideo(0)}}>Update</button>
              <button type="button" className='button' onClick={() => {setVideo(1)}}>Update</button>
              <button type="button" className='button' onClick={() => {setVideo(2)}}>Update</button>
              <button type="button" className='button' onClick={() => {setVideo(3)}}>Update</button>
              <button type="button" className='button' onClick={() => {setVideo(4)}}>Update</button>
            </Col>
          </Row>
          <h1 className='songs-title'> Made with ♥ by Bob...</h1>
        </Container>
      </header>
    </div>
  );
}