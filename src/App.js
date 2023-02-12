import logo from './logo.svg';
import weatherIcon from './invertThis.png'
import './App.css';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateTime from './DateTime';
import react, { useEffect, useState } from "react";
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

export default function App(){
  var aroot = document.querySelector(':root');
  var rootStyles = getComputedStyle(aroot);
  var color = rootStyles.getPropertyValue('--color');
  aroot.style.setProperty('--color', '#5b616c');

  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [weatherType, setWeatherType] = useState("TBD");

  const getWeather = () => {
    fetch("http://127.0.0.1:8004/getWeather")
      .then((response) => response.json())
      .then((data) => {
        const jsonData = JSON.parse(data.data);
        console.log(jsonData);
        setWeatherType(jsonData.conditions[0]);
      })
      .catch(() => {
        setWeatherType("ERROR");
      });
  };
  
  return (
    <div className="App">
      {/* <header>
        Spotify Music Maker
      </header> */}
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
        
        <h1 className="title">Starry Nights & Sunny Days</h1>
        <br></br>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <div class="flex-container">
          <div>Weather</div>
          <div>Time</div>
          <div>Location</div>  
        </div> */}
        <Container className='app-grid'>
          <Row className='grid-row justify-content-md-center'>
            <Col md={2}>
              <div className='condition-container'>
                <div className='weather'>
                  <p className='condition-title'>Weather</p>
                  <img src={weatherIcon} className="weather"/>
                </div>
                <p id='weatherType'>{weatherType}</p>
                
              </div>
            </Col>
            <Col md={2}>
              <div className='condition-container'>
                <p className='condition-title'>Time</p>
                <DateTime className='time'></DateTime>
              </div>
            </Col>
            <Col md={2}>
               <div className='condition-container'>
                <p className='condition-title'>Location</p>
                <p className='place'>Atlanta</p>
                <p className='place'>GA</p>
               </div>
            </Col>
            <Col md={2}>
              <button type="button" id='button' onClick={getWeather}>Update</button>
            </Col>
          </Row>
          {/* <div className='label'> */}
            <h1 className='songs-title'>Some songs you might like...</h1>
            <div className='current-song'>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL4jEyp32wP5sa2Y_rotcEZnVjCTuqqKwE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </Container>
      </header>
      <body>
        <div className = 'body'></div>
      </body>
    </div>
  );
}