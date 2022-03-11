import React, { Component } from "react";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
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
  post: (id) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  },
  addStudent: (
    firstName,
    lastName,
    email,
    password,
    faculty,
    address,
    isGucian
  ) => {
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
    );
  },
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
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/register"
            component={() => (
              <Register
                resetFeedBackForm={this.props.resetFeedBackForm}
                addStudent={this.props.addStudent}
              ></Register>
            )}
          ></Route>
          <Route path="/supervisor" component={SupervisorNavbar}></Route>
          <Route exact path="/student" component={StudentNavbar}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
