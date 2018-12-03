import React, { Component } from "react";
import ForumsTable from "./ForumsTable"

export default class MainScreen extends Component {
    
    state = {
        user: "",
        database: ""
    }

    render() {
        return (
            <div className="Main">
                <div className="NewPost">
                    <ForumsTable database={this.props.database} user={this.props.user}/>
                </div>
            </div>
        );
    }
}