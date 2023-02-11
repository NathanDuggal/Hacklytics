import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  return (
    <div className="App">
      {/* <header>
        Spotify Music Maker
      </header> */}
      <header className="App-header">
        Spotify Playlist Maker
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p className='Text'>
          Sunny Days, Starry Nights
        </p> */}
        {/* <div class="flex-container">
          <div>Weather</div>
          <div>Time</div>
          <div>Location</div>  
        </div> */}
        <Container className='app-grid'>
          <Row className='grid-row'>
            <Col md={4}>
              <div className='condition-container'>Weather</div>
            </Col>
            <Col md={4}>
              <div className='condition-container'>Time</div>
            </Col>
            <Col md={4}>
              <div className='condition-container'>Location</div>
            </Col>
          </Row>
          <h1>Some songs you might like...</h1>
          <Row className='grid-row'>
            <Col md={2}>
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
              </div>
            </Col>
            <Col md={2}>
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
              </div>
            </Col>
            <Col md={2}>
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
              </div>
            </Col>
            {/* <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col> */}
          </Row>
        </Container>
        {/* <a
          id="logo"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br> */}
        {/* <div className='gridBox'>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={NUM_COLUMNS}>
              {Array.from(Array(NUM_BOXES)).map((_, index) => (
                <Grid item xs={COLUMNS_PER_BOX} key={index}>
                  <Item index={index}></Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div> */}
      </header>
    </div>
  );
}