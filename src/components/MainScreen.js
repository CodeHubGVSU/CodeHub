import React, { Component } from "react";

export default class MainScreen extends Component {
    
    state = {
        user: "",
        database: ""
    }

    render() {
        return (
            <div className="Login">
                <p>This is a test for this main page Component</p>
            </div>
        );
    }
}