import React, { Component, useState } from "react";
import Home from "./HomeComponent";
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Form, FormGroup, Input } from "reactstrap";
import { Control, LocalForm, Errors, actions } from "react-redux-form";
import { IconContext } from "react-icons";
import classnames from "classnames";
import * as FaIcons from "react-icons/fa";
import { MdHeight } from "react-icons/md";




class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      intialTab: "1",
    };
    this.changeTab = this.changeTab.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleStudentRegister = this.handleStudentRegister.bind(this);
  }

  changeTab = (tab) => {
    if (this.state.intialTab != tab)
      this.setState({
        intialTab: tab,
      });
  };
  openModal() {
    console.log("Before " + this.state.isModalOpen);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
    console.log("After" + this.state.isModalOpen);
  }


  handleStudentRegister (values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.props.addStudent(values.firstName, values.lastName, values.email, values.password, values.faculty, values.address, values.gucian);
    this.props.resetStudentForm();
    

  }
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
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="close link-underline" onClick={this.openModal}>
                  <i class="fa fa-times" aria-hidden="true"></i>
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
                        <Form className="mt-3" model="studentForm" onSubmit={(values) => this.handleStudentRegister(values)}>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="firstName" md={3}>
                                First Name
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  model=".firstName"
                                  type="text"
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
                                  model=".lastName"
                                  type="text"
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
                                  model=".email"
                                  type="email"
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
                                  model=".password"
                                  type="password"
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
                                <Input id="faculty" name="faculty" type="select" model=".faculty">
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
                                  model=".address"
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
                                  name="gucian"
                                  model=".gucian"
                                ></Input>
                                <strong>GUCian</strong>
                              </Label>
                            </Row>
                          </FormGroup>

                          <Button
                            type="submit"
                            value="submit"
                            color="primary"
                            className="offset-md-10"
                            id="studentForm"
                          >
                            Submit
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col>
                        <Form className="mt-3">
                          <FormGroup>
                            <Row>
                              <Label htmlFor="firstName" md={3}>
                                First Name
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  model=".firstName"
                                  type="text"
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
                                  model=".lastName"
                                  type="text"
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
                                  model=".email"
                                  type="email"
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
                                  model=".password"
                                  type="password"
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
                                <Input id="faculty" name="faculty" type="select" model=".faculty">
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

                          <Button
                            type="submit"
                            value="submit"
                            color="primary"
                            className="offset-md-10"
                            id="supervisorForm"
                          >
                            Submit
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col>
                        <Form className="mt-3">
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
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Label htmlFor="fieldOfWork" md={3}>
                                Field of work
                              </Label>
                              <Col md={9}>
                                <Input
                                  id="fieldOfWork"
                                  name="fieldOfWork"
                                  type="text"
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup check>
                            <Row>
                              <Label check md={{ offset: 3 }}>
                                <Input
                                  type="checkbox"
                                  id="national"
                                  name="gucian"
                                ></Input>
                                <strong>Egyptian</strong>
                              </Label>
                            </Row>
                          </FormGroup>

                          <Button
                            type="submit"
                            value="submit"
                            color="primary"
                            className="offset-md-10"
                            id="examinerForm"
                          >
                            Submit
                          </Button>
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
