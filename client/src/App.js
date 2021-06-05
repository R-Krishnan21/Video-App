import React from 'react'
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Detail from './components/Detail';
import Profile from './components/Profile';
import Search from './components/Search';
import Upload from './components/Upload';
import SubscriptionPage from './components/SubscriptionPage';
import User from './components/User';
import Category from './components/Category';
import { PrivateRoute } from './components/PrivateRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/logout/" component={Logout}/>
                <Route exact path="/signup/" component={Signup}/>
                <Route exact path="/login/" component={Login}/>
                <PrivateRoute exact path="/subscription/" component={SubscriptionPage}/>
                {/* <PrivateRoute exact path="/delete_post/" component={DeletePost}/>
                <PrivateRoute exact path="/profile/" component={Profile}/>
                <PrivateRoute exact path="/profile/update/" component={ProfileUpdate}/>
                <PrivateRoute exact path="/post/new/" component={NewPost}/> */}
                <PrivateRoute exact path="/profile/" component={Profile}/>
                <PrivateRoute exact path="/upload/" component={Upload}/>
                <Route exact path="/detail/:id" component={Detail}/>
                <Route exact path="/user/:id" component={User}/>
                <Route exact path="/category/:id" component={Category}/>
                <Route exact path="/upload/" component={Upload}/>
            </Switch>
        </div>
      </Router>
    </div>
  )
}
