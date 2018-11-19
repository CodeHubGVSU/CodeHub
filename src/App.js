import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/login.css';
import Login from './components/login.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
  
}

export default App;
