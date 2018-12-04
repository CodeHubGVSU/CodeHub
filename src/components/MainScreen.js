import React, { Component } from "react"
import ForumsTable from "./ForumsTable"
import UserInfo from "./UserInfo"
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
                            {/* <ForumInfo /> */}
                            {/* this will be where the right side bar stuff will be, like the popular users (if we do that) or info about the forum */}
                            <p>Forum info will go here</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(MainScreen)