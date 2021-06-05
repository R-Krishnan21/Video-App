import React,{useState, useEffect} from 'react';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton, 
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';
import AuthHandler from './Auth';
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
  

export default function Profile() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState([])
    const [id, setId] = useState("")
    const [open, setOpen] = React.useState(false);

    const port = AuthHandler.port()

    useEffect(() => {
        axios({
            method:'post',
            url:`http://127.0.0.1:${port}/users/me`, 
            headers: {
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
        })
            .then(res => {
                setProfile(res.data)
            }).catch( err => {
                console.log(err)
            })

        axios({
            method:'post',
            url:`http://127.0.0.1:${port}/video/me`, 
            data:{id:AuthHandler.getUserID()}
        })
            .then(res => { 
                setPosts(res.data.videos)
            }) 
            .catch(err => {console.log(err)})
    }, [])

    const handleClickOpen = (e) => {
        setId(e.currentTarget.value)
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios({
            method:'delete',
            url:`http://127.0.0.1:${port}/video`, 
            data:{
                id: id,
                user: AuthHandler.getUserID()
            },
            headers: {
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
        })
            .then(res => {
                const newList = posts.filter((item) => item._id !== res.data.videos._id);
                setPosts(newList);
            }).catch( err => {
                console.log(err)
            })

        setOpen(false);
    }

    const render = posts.map((post) =>  {
        let minutes = Math.floor(post.duration / 60)
        let seconds = Math.floor(post.duration - minutes * 60)
        return <Grid item md={3} key={post._id}>
                    <Card className={classes.root}>
                        <CardActionArea>
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
                                <Typography gutterBottom variant="h5" component="h2"  color="secondary" component={Link} to={`/detail/${post._id}`}>
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
                            <IconButton onClick={handleClickOpen} value={post._id}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </CardActionArea>
                    </Card>
                </Grid>
        })

    return (
        <div>
            <Navbar/>
            <Container>
                <h1>Profile</h1>
                <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                    <Avatar/>
                    <div>
                    <Typography variant="h4" component="h2" style={{marginLeft:"10px"}}>
                        {profile.name}
                    </Typography>
                    </div>
                </div>
                <Divider />
                <Typography variant="h5" component="h2" style={{margin: '20px'}}>
                    Contact info
                </Typography>
                <Divider style={{margin: '0 20px'}} />
                <Grid container spacing={2}>
                    <Grid item xs>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Email"
                                secondary={profile.email}
                            />
                        </ListItem>
                    </List>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h2" style={{margin: '20px'}}>
                    Recent Posts
                </Typography>
                <Divider style={{margin: '0 20px'}} />
                <Grid container spacing={3}>
                    {render}
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete Post ?"}</DialogTitle>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                       Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    )
}
