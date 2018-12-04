import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


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

    // function maketable(snapshot) {
    //     let table = document.getElementById("Main")
    //     var row = table.insertRow(1)
    //     row.setAttribute("id", snapshot.key)
    //     var name = row.insertCell(0)
    //     var phone = row.insertCell(1)
    //     var age = row.insertCell(2)
    //     var action = row.insertCell(3)
    //     name.innerHTML = snapshot.val().name
    //     phoneValue = formatPhoneNumber(snapshot.val().phone)
    //     phone.innerHTML = phoneValue
    //     age.innerHTML = snapshot.val().age
    //     action.innerHTML = "<button id='" + snapshot.key + "' onclick='getrid(this.id)'>Remove</button>"
    // }



    componentDidMount() {
        const Ref = this.props.database.database().ref('questions')

        Ref.on("child_added", snapshot => {
            console.log(snapshot.val())
        })

    }

    PaperSheet() {
        //const { classes } = props;
        var Ref = this.props.database.database().ref().child("questions")



        return (
            <div>
                <Paper className="POST1" elevation={1}>
                    <Typography variant="h5" component="h3">
                        {Ref.title}
                    </Typography>
                    <Typography component="p">
                        {Ref.questions}
                    </Typography>
                </Paper>
            </div>
        );
    }
}