import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/login.css';
import Login from './components/login.js';
import database from './firebase.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login 
        database = {database}
        provider = {new database.auth.GoogleAuthProvider()}
        />
      </div>
    );
  }
  
}

export default App;
