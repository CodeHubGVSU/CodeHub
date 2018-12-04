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




const styles ={
    card: {

    },
    title: {

    }
}

class QuestionsList extends Component {
    
    state = {
        questions: []
    }


    render() {
        const classes = this.props
        let elements = this.state.questions.map((element) => {
            return (
                <div  className={classes.cardDiv} key={element.key}>
                    <Card className={classes.card}>
                        <CardHeader action={
                                <IconButton>
                                    <DeleteIcon />
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
                            <Button size="small">Comments</Button>
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
}

export default withStyles(styles)(QuestionsList)