import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import AuthHandler from './Auth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    inline: {
        display: 'inline',
    },
    margin: {
      margin: theme.spacing(1),
      marginTop:20
    },
    comment:{
        marginBottom:20
    },
    text:{
        [theme.breakpoints.up('md')]: {
            width: "900px"
        },
        [theme.breakpoints.up('sm')]: {
            width: "840px",
            paddingLeft:"35px",
            paddingRight:"35px"
        },
        [theme.breakpoints.down('xs')]: {
            width: "330px",
            paddingLeft:"10px",
            paddingRight:"8px"
        }
    },
    list:{
        marginBottom:"20px"
    }
}));

export default function Comment(props) {
    const classes = useStyles();
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const videoID = props.videoId
    const port = AuthHandler.port()
    
    useEffect(() => {
        let data={videoId:videoID}
        axios.post(`http://127.0.0.1:${port}/comment/getComments`,data) 
        .then(res => { 
            setComments(res.data)
        }) 
        .catch(err => {console.log(err)})
    }, [])

    const handleText = (e) =>{
        e.preventDefault();
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(AuthHandler.isLoggedIn()){
            const variables = {
                writer: AuthHandler.getUserID(),
                postId: videoID,
                content: newComment
            }

            axios.post(`http://127.0.0.1:${port}/comment/saveComment`, variables)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        setNewComment('')
                    } else {
                        alert('Failed to save Comment')
                    }
                })
        } else {
            alert('Login to add comment')
        }
    }

    return (
        <div>
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.comment}>
                    <Grid item>
                        <AccountCircle color="primary" style={{ fontSize:40}}/>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item className={classes.text}>
                                <TextField 
                                    value={newComment}
                                    required 
                                    onChange={handleText} 
                                    id="input-with-icon-grid" 
                                    label="Add a comment..."  
                                    fullWidth   
                                />
                            </Grid>
                            <Grid item>
                                <IconButton color="primary" type="submit">
                                    <SendIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <List className={classes.text}>
                    {comments.map(comment => 
                        <>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt={comment.writer.name} src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={comment.writer.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {comment.content}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </>
                    )}
                </List>
            </div>
        </div>
    )
}
