import React, { Component } from "react";
import Home from "./HomeComponent";
import { Route, Redirect, withRouter, Routes, Switch } from "react-router-dom";
import Register from "./RegisterComponent";
import StudentNavbar from "./StudentNavbar";
import Login from "./LoginComponent";
import SupervisorNavbar from "./SupervisorNavbar";
import { connect } from "react-redux";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { actions } from "react-redux-form";
import { getStudents, addStudent } from "../redux/actionCreators";
const mapStateToProps = (state) => {
  return {
    students: state.students,
    
  };
};
const mapDispatchToProps = (dispatch) => ({
  getStudents: () => dispatch(getStudents()),
  resetFeedBackForm: () => {
    dispatch(actions.reset("studentForm"));
  },
  addStudent: (
    firstName,
    lastName,
    email,
    password,
    faculty,
    address,
    isGucian
  ) =>
    dispatch(
      addStudent(
        firstName,
        lastName,
        email,
        password,
        faculty,
        address,
        isGucian
      )
    ),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Hey");
    this.props.getStudents();
  }

  render() {
    return (
      <div>
        <Switch>
        <Route exact path="/student" component={StudentNavbar}></Route>

          <Route
            path="/"
            component={() => (
              <Home
                addStudent={this.props.addStudent}
                resetFeedBackForm={this.props.resetFeedBackForm}
              ></Home>
            )}
          ></Route>
          <Route
            path="/home"
            component={() => <Home addStudent={this.props.addStudent}></Home>}
          ></Route>
          <Route path="/login" component={Login}></Route>

          <Route path="/supervisor" component={SupervisorNavbar}></Route>
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
