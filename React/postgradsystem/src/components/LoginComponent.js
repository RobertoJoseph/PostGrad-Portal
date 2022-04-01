import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIcons,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Col,
  Collapse,
  NavItem,
  ModalFooter,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { useState } from "react";
import { Control, Form, Errors, actions } from "react-redux-form";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login(props) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserID] = useState(0);

  const toggle = () => setModal(!modal);
  const isAdmin = false;
  const handleSubmit = (values) => {
    //Make axiosget mehtod
    return Axios.post("http://localhost:9000/login/findstudent", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        console.log("Hhhhhhhhhhhhhhh" + " " + response.data.isLogged);
        if (response.data.isLogged) {
          setUserID(response.data.studentID);
          navigate(`/studentprofile/${response.data.studentID}`);
        } else {
          alert(
            "The email or password you entered is incorrect. Please try again."
          );
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div>
        <Button className="bt2 bg-success button " onClick={toggle}>
          <FaIcons.FaSignInAlt></FaIcons.FaSignInAlt> Login
        </Button>
        <Modal centered isOpen={modal}>
          <ModalHeader
            className="modal-header-color"
            close={
              <a className="close link-underline" onClick={toggle}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          >
            <span className="modal-title">Log In</span>
          </ModalHeader>
          <ModalBody>
            <Form model="loginForm" onSubmit={(values) => handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="username">Email</Label>
                <Control.text
                  type="email"
                  id="email"
                  name="email"
                  model=".email"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Control.text
                  type="password"
                  id="password"
                  name="password"
                  model=".password"
                  placeholder="Enter your Password"
                  className="form-control"
                />
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                color="primary"
                className="offset-md-10"
              >
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </IconContext.Provider>
  );
}
export default Login;
