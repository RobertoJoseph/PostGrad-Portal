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
  FormGroup,
} from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";
import { IconContext } from "react-icons";
import classnames from "classnames";
import * as FaIcons from "react-icons/fa";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      intialTab: "1",
    };

    this.changeTab = this.changeTab.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(values) {
    this.props.addStudent(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.faculty,
      values.address,
      values.isGucian
    );
  }
  supRegister = (values) => {
    this.props.addSupervisor(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.faculty
    );
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
                          model="studentForm"
                          onSubmit={(values) => this.handleSubmit(values)}
                          className="mt-3"
                        >
                          <FormGroup>
                            <Row>
                              <Label htmlFor="firstName" md={3}>
                                First Name
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  model=".firstName"
                                  placeholder="First Name"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="lastName" md={3}>
                                Last Name
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  model=".lastName"
                                  placeholder="Last Name"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="email" md={3}>
                                Email
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="email"
                                  name="email"
                                  type="email"
                                  model=".email"
                                  placeholder="Email"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="password" md={3}>
                                Password
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="password"
                                  name="password"
                                  type="password"
                                  model=".password"
                                  placeholder="Password"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="faculty" md={3}>
                                Faculty
                              </Label>
                              <Col md={9}>
                                <Control.select
                                  id="faculty"
                                  name="faculty"
                                  type="select"
                                  model=".faculty"
                                  placeholder="Faculty"
                                  className="form-control"
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
                                </Control.select>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="address" md={3}>
                                Address
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="address"
                                  name="address"
                                  type="textarea"
                                  model=".address"
                                  placeholder="Address"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup check>
                            <Row>
                              <Label check md={{ offset: 3 }}>
                                <Control.checkbox
                                  type="checkbox"
                                  id="gucian"
                                  name="isGucian"
                                  model=".isGucian"
                                ></Control.checkbox>
                                <strong>GUCian</strong>
                              </Label>
                            </Row>
                          </FormGroup>
                          {/* <Link to="/student" className="link-underline">
                            Submit
                          </Link> */}
                          {
                            <Button
                              type="submit"
                              value="submit"
                              color="primary"
                              className="offset-md-10"
                              id="studentForm"
                            >
                              Submit
                            </Button>
                          }
                        </Form>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row>
                      <Col>
                        <Form
                          model="supervisorForm"
                          onSubmit={(values) => this.supRegister(values)}
                          className="mt-3"
                        >
                          <FormGroup>
                            <Row>
                              <Label htmlFor="firstName" md={3}>
                                First Name
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  model=".firstName"
                                  placeholder="First Name"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="lastName" md={3}>
                                Last Name
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  model=".lastName"
                                  placeholder="Last Name"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="email" md={3}>
                                Email
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="email"
                                  name="email"
                                  type="email"
                                  model=".email"
                                  placeholder="Email"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="password" md={3}>
                                Password
                              </Label>
                              <Col md={9}>
                                <Control.text
                                  id="password"
                                  name="password"
                                  type="password"
                                  model=".password"
                                  placeholder="Password"
                                  className="form-control"
                                ></Control.text>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="faculty" md={3}>
                                Faculty
                              </Label>
                              <Col md={9}>
                                <Control.select
                                  id="faculty"
                                  name="faculty"
                                  type="select"
                                  model=".faculty"
                                  placeholder="Faculty"
                                  className="form-control"
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
                                </Control.select>
                              </Col>
                            </Row>
                          </FormGroup>

                          {/* <Link to="/student" className="link-underline">
                            Submit
                          </Link> */}
                          {
                            <Button
                              type="submit"
                              value="submit"
                              color="primary"
                              className="offset-md-10"
                              id="studentForm"
                            >
                              Submit
                            </Button>
                          }
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

export default Register;
