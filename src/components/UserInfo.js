import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = {
}

class UserInfo extends Component {
    
    state = {
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.Main} >
                <h1>{this.props.user.displayName}</h1>
            </div>
        );
    }
}


export default withStyles(styles)(UserInfo)