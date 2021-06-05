import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import AuthHandler from './Auth';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
    return {
        subscribe:{
            [theme.breakpoints.up('md')]: {
                marginLeft:"60px"
            }
        }
    }
})

export default function Subscribe(props) {
    const classes = useStyles()
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    const port = AuthHandler.port()
    const userTo = props.userTo
    const userFrom = props.userFrom


    const onSubscribe = () => {
        if(AuthHandler.isLoggedIn()){

            let subscribeVariables = {
                    userTo : userTo,
                    userFrom : userFrom
            }

            if(Subscribed) {
                axios.post(`http://127.0.0.1:${port}/subscribe/unSubscribe`, subscribeVariables)
                    .then(response => {
                        if(response.data.success){ 
                            setSubscribeNumber(SubscribeNumber - 1)
                            setSubscribed(!Subscribed)
                        } else {
                            alert('Failed to unsubscribe')
                        }
                    })

            } else {
                axios.post(`http://127.0.0.1:${port}/subscribe/subscribe`, subscribeVariables)
                    .then(response => {
                        if(response.data.success) {
                            setSubscribeNumber(SubscribeNumber + 1)
                            setSubscribed(!Subscribed)
                        } else {
                            alert('Failed to subscribe')
                        }
                    })
            }
        } else {
            alert('Login to subscribe')
        }

    }


    useEffect(() => {
        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post(`http://127.0.0.1:${port}/subscribe/subscribeNumber`, subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post(`http://127.0.0.1:${port}/subscribe/subscribed`, subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

    }, [])



    return (
        <div>
            <Button 
                variant="contained" 
                color="secondary" 
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`
                }}
                className={classes.subscribe}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
        </div>
    )
}
