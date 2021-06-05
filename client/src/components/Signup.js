import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
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
    head:{
        textAlign: 'center' 
    },
    back:{
        marginTop:120
    },
    link: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
        textAlign:'center'
    }
}
})

export default function Signup() {
    const classes = useStyles()
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submited, setSubmited] = useState(false)
    const port = AuthHandler.port()

    const handleChange = (e) => {
        if(e.target.name === "setEmail"){
            setEmail(e.target.value)
        } else if(e.target.name === "setUsername") {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: username,
            email: email, 
            password: password
        }
        axios.post(`http://127.0.0.1:${port}/users`,data)
            .then( res => {
                console.log(res)
                setSubmited(true)
            })
            .catch( err => {
                console.log(err)
            })
        
    }
    return (
        <div>
            {submited ?
            <Redirect to="/login"/>: ''
            }
            <Navbar/>
            <Container maxWidth="xs" className={classes.back}>
            <Typography className={classes.head}
                variant="h4" 
                color="primary"
                // component="h2"
                gutterBottom
            >
                Create An Account
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                    onChange={handleChange}
                    name="setUsername"
                    type="text"
                    label="Username" 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                />
                <TextField className={classes.field}
                    onChange={handleChange}
                    name="setEmail"
                    type="email"
                    label="Email" 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                />
                <TextField className={classes.field}
                    onChange={handleChange}
                    name="setPassword"
                    type="password"
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
                    component={RouterLink} to="/login">
                    Login
                </Link>
            </form>
            </Container>
        </div>
    )
}
