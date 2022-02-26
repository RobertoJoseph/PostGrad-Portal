import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Header from './HeaderComponent';
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import { IconContext } from 'react-icons';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Col, Collapse, NavItem, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: true
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div>
                    <Header></Header>
                    <Modal centered isOpen={this.state.isModalOpen} >
                        <ModalHeader className="modal-header-color" close={<a className="close link-underline" onClick={this.toggleModal}>X</a>} ><span className="modal-title">Supervisor</span></ModalHeader>
                        <ModalBody>
                            <Form >
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
                                <ModalFooter>
                                    <Button type="submit" value="submit" style={{ backgroundColor: '#071A2E' }}
                                    >Login </Button>
                                </ModalFooter>

                            </Form>
                        </ModalBody>
                    </Modal>

                </div>






            </IconContext.Provider>

        );
    }
}
export default Login