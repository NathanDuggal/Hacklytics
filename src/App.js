import logo from './logo.svg';
import './App.css';
// import Grid from './Grid';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = function Item(props) {
  const onClick = event => {
    console.log(props.index);
  }

  return <div className='item' onClick={onClick}>{props.index}</div>
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
            <Grid container spacing={0} columns={8}>
              {Array.from(Array(28)).map((_, index) => (
                <Grid item xs={2} key={index}>
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
