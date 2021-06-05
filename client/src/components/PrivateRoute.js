import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHandler from './Auth'

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>  
                AuthHandler.isLoggedIn() ? (<Component {...props}/>) : <Redirect to="/login"/> 
            }
        />
    )
}
