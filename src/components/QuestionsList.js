import React, { Component } from "react";

export default class QuestionsList extends Component {
    
//this is where you will create the list of questions using DOM like in the friends project
//by setting up things like questions.on("child_removed", snapshot => { //do stuff with snapshot})
    render() {
        return (
            <div className="Main">
                <p>Questions list</p>
            </div>
        );
    }
}