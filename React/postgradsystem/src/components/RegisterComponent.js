import React, { Component, useState } from 'react';
import Home from './HomeComponent';
import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
    Form, FormGroup, Input
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { IconContext } from 'react-icons';
import classnames from 'classnames';



function Register() {
    const [showModal, setShowModal] = useState(true);

    const [activeTab, setActiveTab] = useState("1")

    const changeTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    const openModal = () => {
        setShowModal(prev => !prev)

    }
    return (
        <React.Fragment>

            <IconContext.Provider value={{ color: '#fff' }}>
                <div>
                    <Home></Home>
                    <Modal centered isOpen={showModal} >
                        <ModalHeader className="modal-header-color" close={<a className="close link-underline" onClick={openModal}>X</a>} ><span className="modal-title">Sign Up</span></ModalHeader>
                        <ModalBody>
                            <div>
                                <Nav tabs >
                                    <Col md={6}>
                                        <NavItem >
                                            <NavLink
                                                className={classnames({
                                                    active:
                                                        activeTab === '1'
                                                })}
                                                onClick={() => { changeTab('1'); }}
                                            >
                                                Student
                                            </NavLink>
                                        </NavItem>
                                    </Col>
                                    <Col md={6}>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active:
                                                        activeTab === '2'
                                                })}
                                                onClick={() => { changeTab('2'); }}
                                            >
                                                Supervisor
                                            </NavLink>
                                        </NavItem>
                                    </Col>
                                </Nav>
                                <TabContent activeTab={activeTab} >
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col>
                                                <Form className="mt-3" >
                                                    <FormGroup>
                                                        <Label htmlFor="lastname">Firstname</Label>
                                                        <Input id="firstname" name="firstname" type="text"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="lastname">Lastname</Label>
                                                        <Input id="lastname" name="lastname" type="text"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="password">Password</Label>
                                                        <Input id="password" name="password" type="password"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="faculty">Faculty</Label>
                                                        <Input id="lastname" name="lastname" type="text"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" id="remember" name="remember"
                                                            ></Input>
                                                            Gucian
                                                        </Label>
                                                    </FormGroup>


                                                </Form>


                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col>

                                                <Form className="mt-3" >
                                                    <FormGroup>
                                                        <Label htmlFor="username">Username</Label>
                                                        <Input id="username" name="username" type="text"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="password">Password</Label>
                                                        <Input id="password" name="password" type="password"
                                                        ></Input>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" id="remember" name="remember"
                                                            ></Input>
                                                            Remember Me
                                                        </Label>
                                                    </FormGroup>


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

        </React.Fragment>
    );
}

export default Register;