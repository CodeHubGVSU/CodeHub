import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles ={
    dot: {
        backgroundColor: "green",
        borderRadius: "20px",
        height: "5px",
        width: "5px",
        top: "10px",
        left: "-10px",
        position: "absolute"

    },
    main: {
        display: "flex",
        flexDirection: "row",
        position: "relative"
    }
}
class QuestionsList extends Component {
    
    state = {
        users: []
    }

    render() {
        const {classes} = this.props
        let elements = this.state.users.map((element) => {
            return (
                <div key={element.key} className={classes.main}>
                    <div className={classes.dot}></div>
                    <div>{element.val().user}</div>
                </div>
            )
        })
        return <ul id="listOfUsers">{elements}</ul>
    }

    componentWillMount() {
        const Ref = this.props.database.database().ref('users')

        Ref.on("child_added", snapshot => {
            var tempUsers = this.state.users
            if( snapshot.val().loggedIn) {
                tempUsers.unshift(snapshot)

                this.setState({
                    users: tempUsers
                })
            }
        })

        Ref.on("child_changed", snapshot => {
            var tempUsers = this.state.users
            if( snapshot.val().loggedIn) {
                tempUsers.unshift(snapshot)

                this.setState({
                    users: tempUsers
                })
            }
            else {
                var index = tempUsers.map(function(user) { return user.key }).indexOf(snapshot.key);

                if (index > -1) {
                    tempUsers.splice(index, 1);
                }

                this.setState({
                    users: tempUsers
                })
            }
        })
    }
}

export default withStyles(styles)(QuestionsList)