import React, { Component } from 'react';
import './App.css';
import './components/login.css';
import Login from './components/login.js';
import database from './firebase.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login database = {database}/>
      </div>
    );
  }
  
}

export default App;
