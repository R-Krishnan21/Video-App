import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import { makeStyles } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Comment from './Comment';
import Subscribe from './Subscribe';
import Like from './Like';
import axios from 'axios';
import AuthHandler from './Auth';
import {
    Link,
    Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return {
    box: {
        marginTop:"10px",
        [theme.breakpoints.up('lg')]: {
            marginLeft:70,
            marginTop:"20px"
        }
    },
    player:{
        [theme.breakpoints.up('md')]: {
            width: "956px" ,
            height: "538px"
        },
        [theme.breakpoints.up('sm')]: {
            width: "932px",
            height: "524px",
            paddingLeft:"35px",
            paddingRight:"35px"
        },
        [theme.breakpoints.down('xs')]: {
            width: "400px",
            height: "250px",
            paddingLeft:"10px",
            paddingRight:"8px"
        }
    },
    divide:{
        height:"2px",
        backgroundColor:"#f50057",
        [theme.breakpoints.up('md')]: {
            width: "950px"
        },
        [theme.breakpoints.up('sm')]: {
            width: "928px",
            paddingLeft:"35px",
            paddingRight:"35px"
        },
        [theme.breakpoints.down('xs')]: {
            width: "390px",
            paddingLeft:"10px",
            paddingRight:"8px"
        }
    },
    title:{
        [theme.breakpoints.up('md')]: {
            paddingLeft:"35px", 
            marginTop:-10
        }
    },
    views:{
        [theme.breakpoints.up('md')]: {
            paddingLeft:"35px", 
            marginTop:-30
        }
    },
    date:{
        [theme.breakpoints.up('md')]: {
            marginLeft:"10px",
            paddingLeft:"10px"
        }
    },
    side:{
        [theme.breakpoints.up('md')]: {
            paddingLeft:"550px", 
            marginTop:-70
        }
    }
}}
)

export default function Detail(props) {
    const classes = useStyles();
    const [post, setPost] = useState([]);
    const videoId = props.match.params.id;
    const port = AuthHandler.port()

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:${port}/video/${videoId}`) 
        .then(res => { 
            setPost(res.data)
            console.log(res.data)
        }) 
        .catch(err => {console.log(err)})
    }, [])

    if(post.writer){
        return (
            <div className={classes.field} maxWidth="lg">
                <Navbar/>
                <CssBaseline />
                <Box className={classes.box}>
                    <video className={classes.player} controls src={`http://127.0.0.1:${port}/${post.filePath}`}>
                    </video>
                    <List>
                        <ListItem className={classes.title}>
                            <h3>{post.title}</h3>
                        </ListItem>
                        <ListItem className={classes.title}>
                            <h5>{post.description}</h5>
                        </ListItem>
                        <ListItem component={Link} to="/profile">
                            <ListItemAvatar>
                                <Avatar alt={post.writer.name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.writer.name}
                            />
                        </ListItem>
                        <ListItem className={classes.views}>
                            <h3>{post.views} Views</h3>
                            <h3 className={classes.date}>Date </h3>
                        </ListItem>
                        <ListItem className={classes.side}>
                            <Like videoId={post._id} />
                            <Subscribe userFrom={AuthHandler.getUserID()} userTo={post.writer.id}/>
                        </ListItem>
                        <Divider variant="middle" className={classes.divide}/>
                    </List>
                    <Comment videoId={videoId}/>
                </Box>
            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{textAlign:"center"}}>Loading...</h1>
            </div>
        )
    }
}
