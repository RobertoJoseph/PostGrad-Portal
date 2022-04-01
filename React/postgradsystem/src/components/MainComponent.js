import React, { Component } from "react";
import Home from "./HomeComponent";
import { Route, Redirect, Routes } from "react-router-dom";
import Register from "./RegisterComponent";
import StudentNavbar from "./StudentNavbar";
import Login from "./LoginComponent";
import SupervisorNavbar from "./SupervisorNavbar";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { getStudents, addStudent } from "../redux/actionCreators";
import Student from "./StudentProf";

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
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
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addStudent={this.props.addStudent}
                resetFeedBackForm={this.props.resetFeedBackForm}
              ></Home>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <Home
                addStudent={this.props.addStudent}
                resetFeedBackForm={this.props.resetFeedBackForm}
              ></Home>
            }
          ></Route>

          <Route
            path="/supervisor"
            element={<SupervisorNavbar></SupervisorNavbar>}
          ></Route>
          <Route path="/studentprofile/:studentID" element={<Student></Student>}></Route>
        </Routes>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
