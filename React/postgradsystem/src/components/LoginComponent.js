import React, { Component } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import {

  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col

} from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";


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
          navigate(`/student/${response.data.studentID}`);
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
