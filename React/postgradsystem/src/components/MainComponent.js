import React, { Component } from 'react'
import Header from './HeaderComponent'
import Home from './HomeComponent';
import { Switch,Route, Redirect } from 'react-router-dom';
import Login from './LoginComponent'
import Register from './RegisterComponent'



class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header></Header>
                
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Redirect to="/home"></Redirect>
                </Switch>


            </div>
        )
    }
}
export default Main;