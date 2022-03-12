import React, { Component, useState } from "react";
import Home from "./HomeComponent";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { IconContext } from "react-icons";
import classnames from "classnames";
import * as FaIcons from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      intialTab: "1",
      allStudents: [],
      student: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        faculty: "",
        address: "",
        isGucian: false,
      },
      supervisor: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        faculty: "",
      },
      examiner: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        fieldOfWork: "",
        isEgyptian: false,
      },
    };

    this.changeTab = this.changeTab.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleStudentRegister = this.handleStudentRegister.bind(this);
    this.handleSupervisorRegister = this.handleSupervisorRegister.bind(this);
    this.handleExaminerRegister = this.handleExaminerRegister.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
  }

  changeTab = (tab) => {
    if (this.state.intialTab != tab)
      this.setState({
        intialTab: tab,
      });
  };
  openModal() {
    console.log("Here is the props" + " " + this.props.dishes);
    console.log("Before " + this.state.isModalOpen);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    console.log("After" + this.state.isModalOpen);
  }
  handleStudentChange = (event) => {
    const target = event.target;
    const value = target === "checked" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      student: {
        ...this.state.student,
        [name]: value,
      },
    });
  };
 

  handleSupervisorRegister = (event) => {
    var newSupervisor = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      faculty: event.target.faculty.value,
    };
    this.setState({ supervisor: newSupervisor }, () => {
      console.log(this.state.supervisor);
    });
    event.preventDefault();
  };
  handleStudentRegister = (event) => {
  
    Axios.post("http://localhost:9000/testApi", this.state.student)
      .then((response) => {
        console.log(response);
        alert("Succesful Insert" + JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleExaminerRegister = (event) => {
    var newExaminer = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      fieldOfWork: event.target.fieldOfWork.value,
      isEgyptian: event.target.isEgyptian.checked,
    };
    this.setState({ examiner: newExaminer }, () => {
      console.log(this.state.examiner);
    });

    event.preventDefault();
  };
 

  render() {
    return (
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
        
          <Button className="bt1 bg-primary button" onClick={this.openModal}>
            <FaIcons.FaUserPlus></FaIcons.FaUserPlus> Sign Up
          </Button>
          <Modal centered isOpen={this.state.isModalOpen}>
            <ModalHeader
              className="modal-header-color"
              close={
                <a className="close link-underline" onClick={this.openModal}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </a>
              }
            >
              <span className="modal-title">Sign Up</span>
            </ModalHeader>
            <ModalBody>
              <div>
                <Nav tabs>
                  <Col md={4}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.intialTab === "1",
                        })}
                        onClick={() => {
                          this.changeTab("1");
                        }}
                      >
                        Student
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col md={4}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.intialTab === "2",
                        })}
                        onClick={() => {
                          this.changeTab("2");
                        }}
                      >
                        Supervisor
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col md={4}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.intialTab === "3",
                        })}
                        onClick={() => {
                          this.changeTab("3");
                        }}
                      >
                        Examiner
                      </NavLink>
                    </NavItem>
                  </Col>
                </Nav>
                <TabContent activeTab={this.state.intialTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col>
                        <Form
                          className="mt-3"
                          onSubmit={this.handleStudentRegister}
                        >
                          <FormGroup>
                            <Row>
                              <Label htmlFor="firstName" md={3}>
                                First Name
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.firstName}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="lastName" md={3}>
                                Last Name
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.lastName}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="email" md={3}>
                                Email
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.email}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="password" md={3}>
                                Password
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="password"
                                  name="password"
                                  type="password"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.password}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="faculty" md={3}>
                                Faculty
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="faculty"
                                  name="faculty"
                                  type="select"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.faculty}
                                >
                                  <option selected value="art">
                                    Arts
                                  </option>
                                  <option value="cs">Computer Science</option>
                                  <option value="eng">Engineering</option>
                                  <option value="law">Law</option>
                                  <option value="mngt">Management</option>
                                  <option value="med">Medicine</option>
                                  <option value="phar">Pharmacy</option>
                                </Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="address" md={3}>
                                Address
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="address"
                                  name="address"
                                  type="textarea"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.address}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup check>
                            <Row>
                              <Label check md={{ offset: 3 }}>
                                <Input
                                  type="checkbox"
                                  id="gucian"
                                  name="isGucian"
                                  onChange={this.handleStudentChange}
                                  value={this.state.student.isGucian}
                                ></Input>
                                <strong>GUCian</strong>
                              </Label>
                            </Row>
                          </FormGroup>
                          <Link to={
                            {
                              pathname: "/student",
                              state: {
                                student: this.state.student,
                              },
                              
                            }
                          }>Submit</Link>
                          {/* // <Button
                          //   type="submit"
                          //   value="submit"
                          //   color="primary"
                          //   className="offset-md-10"
                          //   id="studentForm"
                          //   onClick={this.handleOnClick}
                          // >
                          //   Submit
                          // </Button> */}
                        </Form>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </IconContext.Provider>
    );
  }
}

export default withRouter(Register);