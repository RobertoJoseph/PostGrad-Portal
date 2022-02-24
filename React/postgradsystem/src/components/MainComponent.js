import React, { Component } from 'react'
import Header from './HeaderComponent'
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './RegisterComponent'
import StudentNavbar from './StudentNavbar';




class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/login" component={StudentNavbar}></Route>
                    <Route path="/register" component={Register}></Route>

                </Switch>


            </div>
        )
    }
}
export default Main;