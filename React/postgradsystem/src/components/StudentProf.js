import "../css/newNav.css";
import React, { Component, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import Thesis from "./Thesis";
import { useParams } from "react-router-dom";
import { StudentData } from "../data/StudentData";
import Reports from "./Reports";
import Courses from "./Courses";
import Publications from "./Publications";
import EditProfile from "./StudentEditProfile";

import * as MdIcons from "react-icons/md";
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

function Student(props) {
  const [URL, setURL] = useState("");
  const [Active, setActive] = useState("");

  let { studentID } = useParams();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [userName, setUsername] = useState("");
  const [isGUCian, setIsGUCian] = useState(false);


  const getUserInformation = () => {
    Axios.get(`http://localhost:9000/students/studentdata/${studentID}`).then(
      (res) => {
        console.log(res.data);
        setUsername(res.data[0].firstName + " " + res.data[0].lastName);
      }
    );
  };

  const checkGUCian = () => {
    Axios.post(`http://localhost:9000/students/isGUCian/${studentID}`,
    {
      sid: studentID
    }).then(
      (res) => {
        if(res.data.isGUCian){
          setIsGUCian(true);

        }

      }
    );
  };

  useEffect(() => {
    console.log("The student is: "+isGUCian);
    getUserInformation();
    checkGUCian();
    console.log("The student is: "+isGUCian);
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
            <button
              className="edit"
              onClick={() => {
                setURL("My Profile");
              }}
            >
              <MdIcons.MdAccountCircle size="50px"></MdIcons.MdAccountCircle>
            </button>
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
              <span id="heading">Student Profile </span>
              <span id="sub-heading">{URL}</span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              {
              
              StudentData.map((item, index) => {

                if(item.title === "Courses"){
                  if(isGUCian) return false;
                }

                return (
                  <li
                    key={index}
                    className="row"
                    onClick={() => {
                      setURL(item.title);
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
          {URL === "Theses" ? (
            <Thesis studentID={studentID} />
          ) : URL === "Reports" ? (
            <Reports studentID={studentID}></Reports>
          ) : URL === "Courses" ? (
            <Courses studentID={studentID}></Courses>
          ) : URL === "Publications" ? (
            <Publications studentID={studentID}></Publications>
          ) : URL === "My Profile" ? (
            <EditProfile studentID={studentID}></EditProfile>
          ) : null}
        </div>
      </Row>
    </div>
  );
}

export default Student;
