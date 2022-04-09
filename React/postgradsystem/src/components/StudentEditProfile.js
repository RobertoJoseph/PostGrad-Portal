import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
    Form, FormGroup, Input, InputGroup
} from 'reactstrap';



class StudentEdit extends Component {
    constructor(props) {
        super(props);


    }



    render() {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div>



                    <Form className="mt-3">
                        <FormGroup>
                            <Row>
                                <Label htmlFor="firstName" md={{ offset: 1, size :1 }}>First Name</Label>
                                <Col md={3}>
                                    <InputGroup>
                                        <Input id="firstName" name="firstName" type="text" value="Kareem"></Input>
                                        <Button>
                                            <FaIcons.FaEdit/>
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Label htmlFor="lastName" md={{ offset: 1, size :1 }}>Last Name</Label>
                                <Col md={3}>
                                    <InputGroup>
                                        <Input id="lastName" name="lastName" type="text" value="Heidar"></Input>
                                        <Button>
                                            <FaIcons.FaEdit/>
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Label htmlFor="email" md={{ offset: 1, size :1 }}>Email</Label>
                                <Col md={3}>
                                    <InputGroup>
                                        <Input id="email" name="email" type="email" value="Kareem.Heidar@guc.edu.eg"></Input>
                                        <Button>
                                            <FaIcons.FaEdit/>
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Label htmlFor="password" md={{ offset: 1, size :1 }}>Password</Label>
                                <Col md={3}>
                                    <InputGroup>
                                        <Input id="password" name="password" type="text" value="Abc_123"></Input>
                                        <Button>
                                            <FaIcons.FaEdit/>
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Label htmlFor="email" md={3}>Email</Label>
                                <Col md={9}><Input id="email" name="email" type="email"></Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Label htmlFor="password" md={3}>Password</Label>
                                <Col md={9}><Input id="password" name="password" type="password"></Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Label htmlFor="faculty" md={3}>Faculty</Label>
                                <Col md={9}><Input id="faculty" name="faculty" type="select">
                                    <option selected value="art">Arts</option>
                                    <option value="cs">Computer Science</option>
                                    <option value="eng">Engineering</option>
                                    <option value="law">Law</option>
                                    <option value="mngt">Management</option>
                                    <option value="med">Medicine</option>
                                    <option value="phar">Pharmacy</option>

                                </Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Label htmlFor="address" md={3}>Address</Label>
                                <Col md={9}><Input id="address" name="address" type="textarea"></Input></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup check>
                            <Row>
                                <Label check md={{ offset: 3 }}>
                                    <Input type="checkbox" id="gucian" name="gucian"></Input>
                                    <strong>GUCian</strong>
                                </Label>
                            </Row>
                        </FormGroup>

                        <Button type="submit" value="submit" color="primary" className='offset-md-10' id='studentForm'>Submit</Button>


                    </Form>


                </div>

            </IconContext.Provider>

        );
    }
}
export default StudentEdit;