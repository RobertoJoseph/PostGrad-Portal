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

function Register() {
  const [showModal, setShowModal] = useState(false);

  const [activeTab, setActiveTab] = useState("1");

  const changeTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleStudentRegister = (event) => {
    alert(
      "FirstName: " +
        event.target.firstName.value +
        " LastName: " +
        event.target.lastName.value +
        " Email: " +
        event.target.email.value +
        " GUCian: " +
        event.target.gucian.checked
    );
    event.preventDefault();
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div>
        <Button className="bt1 bg-primary button" onClick={openModal}>
          <FaIcons.FaUserPlus></FaIcons.FaUserPlus> Sign Up
        </Button>
        <Modal centered isOpen={showModal}>
          <ModalHeader
            className="modal-header-color"
            close={
              <a className="close link-underline" onClick={openModal}>
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
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        changeTab("1");
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
                        active: activeTab === "2",
                      })}
                      onClick={() => {
                        changeTab("2");
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
                        active: activeTab === "3",
                      })}
                      onClick={() => {
                        changeTab("3");
                      }}
                    >
                      Examiner
                    </NavLink>
                  </NavItem>
                </Col>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col>
                      <Form className="mt-3" onSubmit={handleStudentRegister}>
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
                            <Label htmlFor="faculty" md={3}>
                              Faculty
                            </Label>
                            <Col md={9}>
                              <Input id="faculty" name="faculty" type="select">
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
                            <Label htmlFor="faculty" md={3}>
                              Faculty
                            </Label>
                            <Col md={9}>
                              <Input id="faculty" name="faculty" type="select">
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

export default Register;
