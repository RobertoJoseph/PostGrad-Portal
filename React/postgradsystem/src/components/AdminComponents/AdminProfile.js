import React, { useEffect, useState } from "react";
import {
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { AdminData } from "../../data/AdminData";
import * as MdIcons from "react-icons/md";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";
import Axios from "axios";
import "../../css/Admin.css";

import Supervisors from "./ViewSupervisors";
import SupervisorTheses from "./SupAllThesis";
import ListTheses from "./AllTheses";
import Students from "./AllStudents";
import StudentProfile from "./StudentProfile";
import Courses from "./Courses";
import EnrolledStudents from "./EnrolledStudents";
import Defense from "./Defense";
import Payments from "./Payments";

function Admin(props) {
  const [supID, setSupID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  let { adminID } = useParams();
  const [userName, setUsername] = useState("");
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const setTheDropdown = () => toggleDropdown(!isDropdownOpen);
  const [finishStatus, setfinishStatus] = useState(false);
  const [prevAndNextURL, setPrevAndNextURL] = useState(["", "Supervisors"]);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    console.log("I am in the back button");
    if (!finishStatus) {
      setfinishStatus(true);
      setPrevAndNextURL((prev) => [prev[1], prev[0]]);
    }
  };
  const windowOpenAndClose = () => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
  };

  useEffect(() => {
    windowOpenAndClose();
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);
  useEffect(() => {
    windowOpenAndClose();
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [finishStatus]);

  const viewSupervisorThesis = (supervisorID) => {
    setfinishStatus(false);
    setPrevAndNextURL((prev) => [prev[1], "Supervisor's Theses"]);
    setSupID(supervisorID);
  };
  const viewStudentProfile = (studentID) => {
    setfinishStatus(false);
    setPrevAndNextURL((prev) => [prev[1], "Student's Profile"]);
    setStudentID(studentID);
  };

  const getUserInformation = () => {
    Axios.get(`http://localhost:9000/admin/admindata/${adminID}`).then(
      (res) => {
        console.log(res);
        setUsername(res.data[0].name);
      }
    );
  };
  const viewEnrolledStudents = (courseID, courseName) => {
    setPrevAndNextURL((prev) => [prev[1], "Enrolled Students"]);
    setCourseID(courseID);
    setCourseName(courseName);
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div>
      <Navbar color="light" sticky="top">
        <NavbarBrand className="mr-auto">
          <img src="../guc_O.png" height={50} width={130} alt="GUC"></img>
        </NavbarBrand>

        <Nav navbar></Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <span style={{ fontWeight: "bolder", color: "#1C2D43" }}>
              Hello, {userName} &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <ButtonDropdown
              isOpen={isDropdownOpen}
              toggle={setTheDropdown}
              className="edit"
            >
              <DropdownToggle caret id="edit">
                <MdIcons.MdAccountCircle size="50px"></MdIcons.MdAccountCircle>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>My Account</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setPrevAndNextURL((prevURL) => [prevURL[1], "Log Out"]);
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </NavItem>
        </Nav>
      </Navbar>

      <Row className="App">
        <div className="col-2">
          <div className="sideBar">
            <ul className="sidebarList">
              <span>
                <div>
                  <br></br>
                </div>
              </span>
              <span id="heading">Admin Profile </span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              {AdminData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`row ${
                      item.title === prevAndNextURL[1] ? "active" : ""
                    }`}
                    onClick={() => {
                      setfinishStatus(false);
                      setPrevAndNextURL((prevURL) => [prevURL[1], item.title]);
                    }}
                  >
                    <div id="icon">{item.icon}</div>
                    <div id="title" className="titleSize">
                      {item.title}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="col-10 page">
          {prevAndNextURL[1] === "Theses" ? (
            <ListTheses></ListTheses>
          ) : prevAndNextURL[1] === "Students" ? (
            <Students func={viewStudentProfile}></Students>
          ) : prevAndNextURL[1] === "Courses" ? (
            <Courses func={viewEnrolledStudents}></Courses>
          ) : prevAndNextURL[1] === "Supervisors" ? (
            <Supervisors func={viewSupervisorThesis}></Supervisors>
          ) : prevAndNextURL[1] === "Defenses" ? (
            <Defense></Defense>
          ) : prevAndNextURL[1] === "Payments" ? (
            <Payments></Payments>
          ) : prevAndNextURL[1] === "Log Out" ? (
            <></>
          ) : prevAndNextURL[1] === "Supervisor's Theses" ? (
            <SupervisorTheses supervisorID={supID}></SupervisorTheses>
          ) : prevAndNextURL[1] === "Student's Profile" ? (
            <StudentProfile studentID={studentID}></StudentProfile>
          ) : prevAndNextURL[1] === "Enrolled Students" ? (
            <EnrolledStudents
              courseID={courseID}
              courseName={courseName}
            ></EnrolledStudents>
          ) : null}
        </div>
      </Row>
    </div>
  );
}

export default Admin;
