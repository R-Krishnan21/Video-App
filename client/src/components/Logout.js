import React, {useState} from 'react';
import axios from 'axios';
import AuthHandler from './Auth';
import { Redirect } from 'react-router-dom';

export default function Logout() {
    AuthHandler.logoutUser();
    return (
        <div>
            <Redirect to="/login"/>
        </div>
    )
}
