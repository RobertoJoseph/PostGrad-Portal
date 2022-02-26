import React, { Component } from 'react';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './RegisterComponent'
import StudentNavbar from './StudentNavbar';
import Login from './LoginComponent';
import SupervisorNavbar from './SupervisorNavbar';




class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/supervisor" component={SupervisorNavbar}></Route>
                    <Redirect to="/home"></Redirect>
                
                </Switch>


            </div>
        )
    }
}
export default Main;