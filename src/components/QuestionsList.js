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
        comments: []
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
                                    <DeleteIcon id="deleteQuestion" onClick={() => this.deleteQuestion(element)}/>
                                </IconButton>
                            }
                            title={element.val().title}
                        />
                        <CardContent>
                            <Typography className={classes.question} color="textPrimary">
                                {element.val().question}
                            </Typography>
                            <div>
                                <h4>Comments</h4>
                                {this.getComments(element)}
                            </div>
                        </CardContent>
                        <CardActions>
                            <Popup trigger={<Button size="small" className={classes.commentsButton}>Comment</Button>} 
                                modal
                                closeOnDocumentClick
                            >
                            {close => (
                                <div id="inputs" className="modal">
                                    <div className={classes.QuestionTitle}>{element.val().title}</div>
                                    <div className={classes.Question}>{element.val().question}</div>
                                    <TextField
                                        id="comment"
                                        label="Comment"
                                        multiline
                                        rowsMax="10"
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
                                                this.setState({comment: ""})
                                                close()
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

        const commentRef = this.props.database.database().ref('comments')
        var tempComments = []
        commentRef.orderByChild("key").on("child_added", snapshot => {
            tempComments.unshift(snapshot)
        
            this.setState({
                comments: tempComments
            })
        })

        commentRef.on("child_removed", snapshot => {
            
            var tempComments = this.state.comments
            var index = tempComments.map(function(comment) { return comment.key; }).indexOf(snapshot.key);

            if (index > -1) {
                tempComments.splice(index, 1);
            }

            this.setState({
                comments: tempComments
            })
        })
    }

    deleteQuestion(element) {
        if( this.props.user.uid === element.val().uid)
        {   
            const Ref = this.props.database.database().ref('questions')
            Ref.child(element.key).remove()
        }
    }

    deleteComment(element) {
        console.log("here")
        if( this.props.user.uid === element.val().uid)
        {   
            console.log("here1")
            const Ref = this.props.database.database().ref('comments')
            Ref.child(element.key).remove()
        }
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
        
        var commentList = []
        for(var i = 0; i < this.state.comments.length; i++) {
            if(this.state.comments[i].val().key === element.key) {
                commentList.unshift(this.state.comments[i])
            }
        }
        let commentListProps = commentList.map((comment) => {
            return (
                <div key={comment.key}>
                    <Typography className="comment" color="textPrimary">
                        <IconButton>
                            <DeleteIcon id="deleteComment" onClick={() => this.deleteComment(comment)}/>
                        </IconButton>
                        {comment.val().comment}
                    </Typography>
                </div>
            )
        })
        return <ul id="listOfComments">{commentListProps}</ul>
    }

}

export default withStyles(styles)(QuestionsList)