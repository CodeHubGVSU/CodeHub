import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './login.css';
import firebase from 'firebase'

export default class Login extends Component {
    
    state = {
        email: "",
        password: "",
        loggedIn: false,
        user: ""
    }

    render() {
        return (
            <div className="Login">
                <Button onClick={() => this.validateForm()}>Login</Button>
            </div>
        );
    }

    validateForm() {
        var provider = new firebase.auth.GoogleAuthProvider()
        this.props.database.auth().signInWithPopup(provider)
        .then((result) => {
            this.setState({
                user: result.user,
                authenticated: true
            })

            

        })
    }

}
