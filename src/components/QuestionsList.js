import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Popup from "reactjs-popup";


const styles ={
    card: {

    },
    title: {

    }
}

class QuestionsList extends Component {
    
    state = {
        questions: [],
        comment: "",
        comments: null
    }

    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    render() {
        const classes = this.props
        let elements = this.state.questions.map((element) => {
            return (
                <div  className={classes.cardDiv} key={element.key}>
                    <Card className={classes.card}>
                        <CardHeader action={
                                <IconButton>
                                    <DeleteIcon onClick={() => this.deleteQuestion(element.key)}/>
                                </IconButton>
                            }
                            title={element.val().title}
                        />
                        <CardContent>
                            <Typography className={classes.question} color="textPrimary">
                                {element.val().question}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Popup trigger={<Button size="small" className={classes.commentsButton}>Comment</Button>} 
                                modal
                                closeOnDocumentClick
                            >
                            {close => (
                                <div id="inputs" className="modal">
                                    <div className={classes.InputHeader}>{element.val().title}</div>
                                    <div>{this.getComments(element)}</div>
                                    
                                    <TextField
                                        id="comment"
                                        label="Comment"
                                        multiline
                                        rowsMax="10"
                                        disabled
                                        value={this.state.comment}
                                        onChange={this.handleChange('comment')}
                                        className={classes.TextField}
                                        margin="dense"
                                        fullWidth
                                    />
                                    <div className="actions">
                                        <Button
                                            className="commentButton"
                                            onClick={() => {
                                                this.addComment(element.key)
                                            }}
                                        >
                                            Submit comment
                                        </Button>
                                    </div>
                                </div>
                                )}
                            </Popup>
                        </CardActions>
                    </Card>
                    <br/>
                </div>
            )
        })
        return <ul id="listOfCards">{elements}</ul>
    }

    componentWillMount() {
        const Ref = this.props.database.database().ref('questions')

        Ref.on("child_added", snapshot => {
            
            var tempQuestions = this.state.questions
            tempQuestions.unshift(snapshot)

            this.setState({
                questions: tempQuestions
            })
        })

        Ref.on("child_removed", snapshot => {
            
            var tempQuestions = this.state.questions
            var index = tempQuestions.map(function(question) { return question.key; }).indexOf(snapshot.key);

            if (index > -1) {
                tempQuestions.splice(index, 1);
            }

            this.setState({
                questions: tempQuestions
            })
        })

    }

    deleteQuestion(key) {
        const Ref = this.props.database.database().ref('questions')
        Ref.child(key).remove()
    }

    addComment(key) {
        var comments = this.props.database.database().ref().child("comments")
        comments.push().set({
            comment: this.state.comment,
            uid: this.props.user.uid,
            key: key
        });
    } 

    getComments(element) {
        
        const Ref = this.props.database.database().ref('comments')
        var comments = []
        Ref.orderByChild("key").on("child_added", snapshot => {
            console.log(snapshot.val())
            console.log(element.key)            
            console.log("1")
            if(snapshot.val().key === element.key)
                comments.unshift(<div key={snapshot.key}>
                                    <Typography className="comment" color="textPrimary">
                                        {snapshot.val().comment}
                                    </Typography>
                                 </div>
                                )
        })
        console.log("2")

        // let commentList = comments.map((comment) => {
        //     return (
        //         <div key={comment.key}>
        //             <Typography className="comment" color="textPrimary">
        //                 {comment.val().comment}
        //             </Typography>
        //         </div>
        //     )
        // })
        
        return <ul id="listOfCards">{comments}</ul>
    }

}

export default withStyles(styles)(QuestionsList)