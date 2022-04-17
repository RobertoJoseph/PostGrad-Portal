import React, { useEffect, useState } from "react";
import { Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { AdminData } from "../../data/AdminData"
import * as MdIcons from "react-icons/md";
import { Nav, NavItem, Navbar, NavbarBrand } from "reactstrap";
import Axios from "axios";
import "../../css/Admin.css";

import Supervisors from "./ViewSupervisors";
import SupervisorTheses from "./SupAllThesis";
import ListTheses from "./AllTheses";




function Admin(props) {
  const [URL, setURL] = useState("");
  const [supID, setSupID] = useState("");
  let { adminID } = useParams();
  const [userName, setUsername] = useState("");
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const setTheDropdown = () => toggleDropdown(!isDropdownOpen);

  const viewSupervisorThesis = (supervisorID) => {
    setURL("Supervisor's Theses");
    setSupID(supervisorID);
  }


  const getUserInformation = () => {
    Axios.get(`http://localhost:9000/admin/admindata/${adminID}`).then(
      (res) => {
        setUsername(res.data[0].Name);
      }
    );
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
                <DropdownItem header>
                  My Account
                </DropdownItem>
                <DropdownItem onClick={() => {setURL("Log Out");}}>
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
              <span id="sub-heading">{URL}</span>
              <span>
                <div>
                  <br></br>
                  <br></br>
                </div>
              </span>
              {

                AdminData.map((item, index) => {

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
              <ListTheses></ListTheses>
          ) : URL === "Students" ? (
              <></>
          ) : URL === "Courses" ? (
              <></>
          ) : URL === "Supervisors" ? (
              <Supervisors func={viewSupervisorThesis}></Supervisors>
          ) : URL === "Defenses" ? (
              <></>
          ) : URL === "Installments" ? (
              <></>
          ) : URL === "Log Out" ? (
              <></>
          ) : URL === "Supervisor's Theses" ? (
              <SupervisorTheses supervisorID={supID}></SupervisorTheses>
          ) : null }
        </div>
      </Row>
    </div>
  );
}

export default Admin;
