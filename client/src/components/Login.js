import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Navbar from './Navbar';
import axios from 'axios';
import AuthHandler from './Auth';


const useStyles = makeStyles((theme) => {
    return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    },
    link: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
        textAlign:'center'
    },
    head:{
        textAlign: 'center' 
    },
    back:{
        marginTop:80,
        backgroundColor: "secondary",
        padding: "50px"
    }
}
})

export default function Signup() {
    const classes = useStyles()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submited, setSubmited] = useState(AuthHandler.isLoggedIn())
    const port = AuthHandler.port()

    const handleChange = (e) => {
        if(e.target.name === "setEmail"){
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email, 
            password: password
        }

        axios.post(`http://127.0.0.1:${port}/users/login`,data)
            .then( res => {
                // console.log(res)
                if (res.status === 200){
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user_id", res.data.user._id)
                    setSubmited(AuthHandler.isLoggedIn())
                }
            })
            .catch( err => {
                console.log(err)
            })
    }

    return (
        <div>
            {submited ?
            <Redirect to="/"/>: ''
            }
            <Navbar/>
            <Container maxWidth="xs" className={classes.back}>
            <Typography className={classes.head}
                variant="h3" 
                color="primary"
                // component="h2"
                gutterBottom
            >
                Login
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                    onChange={handleChange}
                    type="email"
                    name="setEmail"
                    label="Email" 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                />
                <TextField className={classes.field}
                    onChange={handleChange}
                    type="password"
                    name="setPassword"
                    label="Password" 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                />
                <Button
                    type="submit" 
                    color="secondary" 
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<KeyboardArrowRightIcon />}>
                    Submit
                </Button>
                <Link 
                    className={classes.link}
                    variant="h5" 
                    component={RouterLink} to="/signup">
                    Create An Account
                </Link>
            </form>
            </Container>
        </div>
    )
}
