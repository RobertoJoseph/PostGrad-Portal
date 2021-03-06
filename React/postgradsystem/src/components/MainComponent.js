import React, { Component } from "react";
import Home from "./HomeComponent";
import { Route, Redirect, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import {
  addStudent,
  addSupervisor,
  addExaminer,
} from "../redux/actionCreators";
import Student from "./StudentComponents/StudentProf";
import SupervisorProf from "./SupervisorComponents/SupervisorProf";
import Admin from "./AdminComponents/AdminProfile";
import ExaminerProf from "./ExaminerComponents/ExaminerProf";

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};
const mapDispatchToProps = (dispatch) => ({
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
  addSupervisor: (firstName, lastName, email, password, faculty) =>
    dispatch(addSupervisor(firstName, lastName, email, password, faculty)),
  addExaminer: (name, email, password, fieldOfWork, isEgyptian) =>
    dispatch(addExaminer(name, email, password, fieldOfWork, isEgyptian)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Hey");
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
                addSupervisor={this.props.addSupervisor}
                resetFeedBackForm={this.props.resetFeedBackForm}
                addExaminer={this.props.addExaminer}
              ></Home>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <Home
                addStudent={this.props.addStudent}
                addSupervisor={this.props.addSupervisor}
                resetFeedBackForm={this.props.resetFeedBackForm}
                addExaminer={this.props.addExaminer}
              ></Home>
            }
          ></Route>

          <Route
            path="/supervisor/:supervisorId"
            element={<SupervisorProf></SupervisorProf>}
          ></Route>
          <Route
            path="/studentprofile/:studentID"
            element={<Student></Student>}
          ></Route>
          <Route
            path="/examiner/:examinerID"
            element={<ExaminerProf></ExaminerProf>}
          ></Route>
          <Route
            path="/studentprofile/:studentID"
            element={<Student></Student>}
          ></Route>
          <Route path="/admin/:adminID" element={<Admin></Admin>}></Route>
        </Routes>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
