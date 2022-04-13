import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import { Modal, ModalBody, ModalHeader, FormGroup, Label } from "reactstrap";

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
        if (response.data.isLogged) {
          setUserID(response.data.userID);
          switch(response.data.userType){
            case 0:
              //GucianStudent
              navigate(`/studentprofile/${response.data.userID}`);break;
            case 1:
              //NonGucianStudent
              navigate(`/studentprofile/${response.data.userID}`);break;
            case 2:
              //Supervisor
              navigate(`/supervisor/${response.data.userID}`);break;
            case 3:
              //Examiner                            
          }

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
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
