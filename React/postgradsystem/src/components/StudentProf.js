import "../css/newNav.css";
import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import { Route, Redirect, Routes } from "react-router-dom";
import Thesis from "./Thesis";
import { useParams } from "react-router-dom";
import { StudentData } from "../data/StudentData";
import Reports from "./Reports";

function Student(props) {
  const [URL, setURL] = useState("");
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
            <span id="header">Student Profile </span>
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
                  <div id="title">{item.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-10">
        {URL === "Theses" ? (
          <Thesis studentID={studentID} />
        ) : URL === "Reports" ? (
          <Reports></Reports>
        ) : null}
      </div>
    </Row>
  );
}

export default Student;
