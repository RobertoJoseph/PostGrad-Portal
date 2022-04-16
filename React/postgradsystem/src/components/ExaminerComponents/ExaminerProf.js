import "../../css/newNav.css";
import React, { Component, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import ExaminerEditProfile from "./ExaminerEditProf";
import Defense from "./Defense";
import * as IoIcons from "react-icons/io";

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

function ExaminerProf() {
  const [URL, setURL] = useState("");
  const [Active, setActive] = useState("");
  let { examinerID } = useParams();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [userName, setUsername] = useState("");
  const [examinerData, setExaminerData] = useState([]);

  const getExaminerInformation = () => {
    Axios.get(`http://localhost:9000/examiner/examinerdata/${examinerID}`).then(
      (res) => {
        console.log("This is the resdata: " + res.data[0].name);
        setExaminerData(res.data[0]);
        setUsername(res.data[0].name);
      }
    );
  };
  useEffect(() => {
    getExaminerInformation();
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
              <span id="heading">Examiner Profile </span>
              <span id="sub-heading">{URL}</span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              <li
                className="row"
                onClick={() => {
                  setURL("Defenses");
                }}
              >
                <div id="icon">
                  <IoIcons.IoMdPaper></IoIcons.IoMdPaper>
                </div>
                <div id="title" className="titleSize">
                  Defenses
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-10 page">
          {URL === "Defenses" ? (
            <Defense examinerID={examinerID} />
          ) : URL === "My Profile" ? (
            <ExaminerEditProfile
              examinerID={examinerID}
              examinerData={examinerData}
            />
          ) : null}
        </div>
      </Row>
    </div>
  );
}

export default ExaminerProf;
