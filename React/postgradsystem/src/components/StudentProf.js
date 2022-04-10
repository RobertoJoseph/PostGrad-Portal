import "../css/newNav.css";
import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import Thesis from "./Thesis";
import { useParams } from "react-router-dom";
import { StudentData } from "../data/StudentData";
import Reports from "./Reports";
import Courses from "./Courses";
import Publications from "./Publications";
import EditProfile from "./StudentEditProfile";


function Student(props) {
  const [URL, setURL] = useState("");
  const [Active, setActive] = useState("");

  let { studentID } = useParams();
  return (
    <Row className="App">
      <div className="col-2">
        <div className="sideBar">
          <ul className="sidebarList">
            <span>
              <div>
                <br></br>
              </div>
            </span>
            <span id="header">Student Profile</span>
            <span id="sub-header">{URL}</span>
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
                    setActive("active");
                  }}
                  id={Active === "active" ? "active" : "" }
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
          <Reports></Reports>
        ) : URL === "Courses" ? (
          <Courses studentID={studentID}></Courses>
        ) : URL === "Publications" ? (
          <Publications studentID={studentID}></Publications>
        ) : URL === "My Profile" ? (
          <EditProfile studentID={studentID}></EditProfile>
        ) : null }
      </div>
    </Row>
  );
}

export default Student;
