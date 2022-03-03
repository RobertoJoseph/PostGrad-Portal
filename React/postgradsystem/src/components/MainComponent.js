import React, { Component } from 'react';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Register from './RegisterComponent';
import { connect } from 'react-redux';
import StudentNavbar from './StudentNavbar';
import Login from './LoginComponent';
import SupervisorNavbar from './SupervisorNavbar';
import { studentRegister, addStudent } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => {
    return {
      studentData: state.studentData

    }
  }

  const mapDispatchToProps = dispatch => ({
  
    studentRegister: (firstName, lastName, email, password, faculty, address, gucian ) => dispatch(studentRegister(firstName, lastName, email, password, faculty, address, gucian )),
    addStudent: (firstName, lastName, email, password, faculty, address, gucian ) => dispatch(addStudent(firstName, lastName, email, password, faculty, address, gucian )),
    resetStudentForm: () => { dispatch(actions.reset('studentForm'))}

  
  });

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
                    <Route path="/register" component={() => <Register studentRegister={this.props.studentRegister} resetStudentForm={this.props.resetStudentForm} addStudent={this.props.addStudent}/>}></Route>
                    <Route path="/student" component={() => <StudentNavbar data={this.props.studentData} />}></Route>
                    <Redirect to="/home"></Redirect>
                
                </Switch>


            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
