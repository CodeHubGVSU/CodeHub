import React, { Component } from "react"
import ForumsTable from "./ForumsTable"
import UserInfo from "./UserInfo"
import OnlineUsers from "./OnlineUsers"
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = {
}

class MainScreen extends Component {
    
    state = {
        user: "",
        database: ""
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.Main} >
                <Grid container >
                    <Grid item md={2}>
                        <div className={classes.LeftSideBar}>
                            <UserInfo database={this.props.database} user={this.props.user}/>
                        </div>
                    </Grid>
                    <Grid item md={8}>
                        <div className={classes.ForumSection}>
                            <ForumsTable database={this.props.database} user={this.props.user}/><br/>
                        </div>
                    </Grid>
                    <Grid item md={2}>
                        <div className={classes.RightSideBar}>
                            <h1>Online Users:</h1>
                            <OnlineUsers database={this.props.database} user={this.props.user}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(MainScreen)