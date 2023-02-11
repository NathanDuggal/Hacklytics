import logo from './logo.svg';
import './App.css';
// import Grid from './Grid';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const NUM_COLUMNS = 4;
const COLUMNS_PER_BOX = 1;
const NUM_BOXES = 28;

const Item = function Item(props) {
  const onClick = event => {
    console.log(props.index);
    let thisItem = document.getElementById(String(props.index));
    console.log(thisItem.style.backgroundColor);
    let toggle = String(thisItem.style.backgroundColor) === "rgb(255, 255, 255)" || String(thisItem.style.backgroundColor) == "";
    for (let i = Number(props.index) % NUM_COLUMNS; i < NUM_BOXES; i += NUM_COLUMNS) {
      document.getElementById(String(i)).style.backgroundColor = "#FFFFFF";
    }
    if (toggle) {
      thisItem.style.backgroundColor = "#000000"; 
    }
  }

  return <div id={props.index} className='item' onClick={onClick}>{props.index}</div>
}

function select(e) {
    // access to e.target here
    console.log("here");
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
        <div className='gridBox'>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={NUM_COLUMNS}>
              {Array.from(Array(NUM_BOXES)).map((_, index) => (
                <Grid item xs={COLUMNS_PER_BOX} key={index}>
                  <Item index={index}></Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </header>
    </div>
  );
}

export default App;
