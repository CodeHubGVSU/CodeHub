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
                <div className="LeftSideBar">
                    {/* <UserInfo /> */}
                    {/* this will be where the left side bar stuff will be like user info */}
                </div>
                <div className="ForumSection">
                    <ForumsTable database={this.props.database} user={this.props.user}/>
                </div>
                <div className="RightSideBar">
                    {/* <ForumInfo /> */}
                    {/* this will be where the right side bar stuff will be, like the popular users (if we do that) or info about the forum */}
                </div>
            </div>
        );
    }
}