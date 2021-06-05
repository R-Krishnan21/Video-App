import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';
import axios from 'axios';
import AuthHandler from './Auth';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import {
  Link,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

export default function SubscriptionPage() {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const port = AuthHandler.port()

    let variable = { userFrom : AuthHandler.getUserID()  }

    useEffect(() => {
        axios.post(`http://127.0.0.1:${port}/video/SubscriptionVideos`, variable)
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.videos)
                    console.log(posts)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }, [])

  const render = posts.map((post) =>  {
    let minutes = Math.floor(post.duration / 60)
    let seconds = Math.floor(post.duration - minutes * 60)
    return <Grid item md={3} key={post._id}>
                <Card className={classes.root}>
                    <CardActionArea component={Link} to={`/detail/${post._id}`}>
                        <CardMedia
                          style={{width: "100%",height:"100%"}}
                          component="img"
                          className={classes.media}
                          image={`http://localhost:${port}/${post.thumbnail}`}
                          title={post.title}
                          />
                        <CardContent>
                        <div className=" duration"
                            style={{ top: 198, right:0, position: 'absolute', margin: '4px', 
                            color: '#fff', backgroundColor: 'rgb(28, 28, 28)', opacity: 0.8, 
                            padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                            fontWeight:'500', lineHeight:'12px' }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                            <Typography gutterBottom variant="h5" component="h2"  color="secondary">
                                {post.title}
                            </Typography>
                        </CardContent>
                        <CardHeader
                          component={Link} to={`/`}
                          style={{marginTop:-35}}
                          avatar={
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                          }
                          title={post.writer.name}
                          subheader={moment(post.createdAt).format("MMM Do YY")}
                        />
                    </CardActionArea>
                </Card>
            </Grid>
    })

  return (
    <div>
        <CssBaseline />
        <Navbar/>
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={3}>
                {render}
            </Grid>
        </Container>
    </div>
  );
}
