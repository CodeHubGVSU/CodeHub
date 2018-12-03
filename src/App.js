import React, { Component } from 'react'
import './App.css'
import { Button } from "react-bootstrap"
import firebase from 'firebase'
import MainScreen from './components/MainScreen'
import database from './firebase.js'

class App extends Component {

  state = {
    authenticated: false,
    user: null
  }

  render() {
    return (
      <div className="App">
        <div className="Login">
          {this.state.authenticated ? <Button onClick={() => this.logout()}>Logout</Button> : <Button onClick={() => this.validateForm()}>Login</Button>}
        </div>
        <div className="Main">
          {this.state.authenticated ? <MainScreen database={database}/> : <p>login screen</p>}
        </div>
      </div>
    );
  }

  logout() {
    database.auth().signOut()
    .then(() => {
      this.setState({
        authenticated: false,
        user: null
      })
    })
  }

  validateForm() {
    var provider = new firebase.auth.GoogleAuthProvider()
    database.auth().signInWithPopup(provider)
    .then((result) => {
        this.setState({
            user: result.user,
            authenticated: true
        })
    })
  }
}

export default App;
