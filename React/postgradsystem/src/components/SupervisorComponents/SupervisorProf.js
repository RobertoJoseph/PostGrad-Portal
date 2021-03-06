import "../../css/newNav.css";
import React, { Component, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SupervisorData } from "../../data/SupervisorData";
import MyStudents from "./MyStudents";
import Reports from "./Reports";
import SupervisorEditProfile from "./SupervisorEditProfile";
import NewReports from "./NewReports";

import * as MdIcons from "react-icons/md";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Axios from "axios";
function SupervisorProf() {
  const [Active, setActive] = useState("");

  let { supervisorId } = useParams();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [userName, setUsername] = useState("");
  const [selectedStudent, setSelectedStudent] = useState({});
  const [prevAndNextURL, setPrevAndNextURL] = useState(["", "My Students"]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const [finishStatus, setfinishStatus] = useState(false);
  const setTheDropdown = () => toggleDropdown(!isDropdownOpen);

  const onBackButtonEvent = (e) => {
    e.preventDefault();

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

  const viewStudentReports = (student) => {
    setPrevAndNextURL((prev) => [prev[1], "Reports"]);
    setSelectedStudent(student);
  };
  const getUserInformation = () => {
    console.log("I am in the supervisorProf, the id is: " + supervisorId);
    Axios.get(
      `http://localhost:9000/supervisor/supervisordata/${supervisorId}`
    ).then((res) => {
      console.log(res.data);
      setUsername(res.data[0].firstName + " " + res.data[0].lastName);
      setSupervisorData(res.data);
    });
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
                    setPrevAndNextURL((prev) => [prev[1], "My Profile"]);
                  }}
                >
                  Personal Info
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    setPrevAndNextURL((prev) => [prev[1], "Log Out"]);
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
              <span id="heading">Supervisor Profile </span>
              <span id="sub-heading">{URL}</span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              {SupervisorData.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="row"
                    onClick={() => {
                      setPrevAndNextURL((prev) => [prev[1], item.title]);
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
          {prevAndNextURL[1] === "My Students" ? (
            <MyStudents
              supervisorId={supervisorId}
              func={viewStudentReports}
            ></MyStudents>
          ) : prevAndNextURL[1] === "Reports" ? (
            <Reports
              student={selectedStudent}
              supervisorId={supervisorId}
            ></Reports>
          ) : prevAndNextURL[1] === "My Profile" ? (
            <SupervisorEditProfile
              supervisorData={supervisorData}
              supervisorId={supervisorId}
            ></SupervisorEditProfile>
          ) : prevAndNextURL[1] === "All Reports" ? (
            <NewReports supervisorId={supervisorId}></NewReports>
          ) : null}
        </div>
      </Row>
    </div>
  );
}

export default SupervisorProf;
