import React, { Component } from "react";
import Popup from "reactjs-popup";

export default class ForumsTable extends Component {
    
    state = {
    }

    render() {
        return (
            <div className="Forums">
                <div className="NewPost">
                    <Popup trigger={<button className="button"> New question </button>} 
                        modal
                        closeOnDocumentClick
                    >
                    {close => (
                        <div id="inputs" className="modal">
                            <div className="header"> New Post </div>
                                <input id="title" type="text" name="title" placeholder="Enter title..."></input><br/>
                                <input id="question" type="text" name="question" placeholder="Enter question..."></input><br/>
                            <div className="actions">
                            
                            
                            <button
                                className="button"
                                onClick={() => {
                                    this.newPost()
                                    close()
                                }}
                            >
                                Submit new post
                            </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
            </div>
        );
    }

    newPost() {
        var div = document.getElementById("inputs")
        var inputs = div.children

        var title = inputs[1].value
        var question = inputs[3].value

        var questions = this.props.database.database().ref().child("questions");
        questions.push().set({ 
            title: title,
            question: question,
            uid: this.props.user.uid
        });
    }

}