import React, { Component } from "react";
import Popup from "reactjs-popup";
import QuestionsList from './QuestionsList'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
    NewPost: {
        textAlign: 'center'
    },
    InputHeader: {
        fontSize: 40
    }
}
class ForumsTable extends Component {
    
    state = {
        title: "",
        question:""
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render() {
        const { classes } = this.props
        return (
            <div className="Forums">
                <div className={classes.NewPost}><br/>
                    <Popup trigger={<Button variant="outlined" className="button">Ask a question!</Button>} 
                        modal
                        closeOnDocumentClick
                    >
                    {close => (
                        <div id="inputs" className="modal">
                            <div className={classes.InputHeader}> New Question </div>
                                <TextField
                                    id="title"
                                    label="Title"
                                    multiline
                                    rowsMax="2"
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    className={classes.TextField}
                                    margin="normal"
                                    fullWidth
                                /><br/>
                                <TextField
                                    id="question"
                                    label="Question"
                                    multiline
                                    rowsMax="10"
                                    value={this.state.question}
                                    onChange={this.handleChange('question')}
                                    className={classes.TextField}
                                    margin="dense"
                                    fullWidth
                                />
                            <div className="actions">
                            
                            
                            <Button
                                className="button"
                                onClick={() => {
                                    this.newPost()
                                    close()
                                }}
                                variant="outlined"
                            >
                                Submit question
                            </Button>
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
                <div className="Questions">
                    <QuestionsList database={this.props.database} user={this.props.user}/>
                </div>
            </div>
        );
    }

    newPost() {
        var questions = this.props.database.database().ref().child("questions")
        questions.push().set({ 
            title: this.state.title,
            question: this.state.question,
            uid: this.props.user.uid
        });
    }    

}

export default withStyles(styles)(ForumsTable)