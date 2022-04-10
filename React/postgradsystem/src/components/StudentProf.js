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
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";
import Axios from "axios";

function Student(props) {
  const [URL, setURL] = useState("");
  const [Active, setActive] = useState("");

  let { studentID } = useParams();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [userName, setUsername] = useState("");

  const getUserInformation = () => {
    Axios.get(`http://localhost:9000/students/studentdata/${studentID}`).then(
      (res) => {
        setUsername(res.data[0].firstName + " " + res.data[0].lastName);
      }
    );
  };
  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div>
      <div className="header">
        <img className="gucImage" src="../guc_O.png"></img>
        <span
          style={{
            left: "415px",
            position: "relative",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          Hello, {userName}
        </span>{" "}
        {"          "}
        <button
          className="edit"
          onClick={() => {
            setURL("My Profile");
          }}
        >
          <MdIcons.MdAccountCircle size="50px"></MdIcons.MdAccountCircle>
        </button>
      </div>
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
              {StudentData.map((item, index) => {
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
        <Modal centered isOpen={isModalOpen} toggle={setTheModal}>
          <ModalHeader
            style={{ backgroundColor: "#081A2D", color: "white" }}
            toggle={setTheModal}
            close={
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="close link-underline" onClick={setTheModal}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          >
            Add Progress Report
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="date">Date</Label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <input
                  type="textarea"
                  id="textarea"
                  name="description"
                  className="form-control"
                />
              </FormGroup>

              <input
                type="submit"
                value="Submit"
                className="form-control btn-primary"
              />
            </Form>
          </ModalBody>
        </Modal>

        <div className="col-10 page">
          {URL === "Theses" ? (
            <Thesis studentID={studentID} />
          ) : URL === "Reports" ? (
            <Reports></Reports>
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
