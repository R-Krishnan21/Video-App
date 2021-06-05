import axios from 'axios';

class AuthHandler {
    
    static getLoginToken(){
        return localStorage.getItem("token")
    }

    static isLoggedIn() { 
        if(this.getLoginToken()){
            return true;
        } else{
            return false;
        }
    }

    static logoutUser(){
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    }

    static getUserID(){
        return localStorage.getItem("user_id")
    }

    static port(){
        return 4000
    }

    static isOwner(id){
        if(AuthHandler.isLoggedIn()){
            if(id === this.getUserID()){
                return true;
            } else {
                return false;
            }
        }
    }
}

export default AuthHandler;