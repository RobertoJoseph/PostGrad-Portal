import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
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
import { Nav, Navbar, NavbarBrand, NavbarToggler, Col, Collapse, NavItem, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

    render() {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div>

                    <Button className="bt2 bg-success button " onClick={this.toggleModal}><FaIcons.FaSignInAlt></FaIcons.FaSignInAlt> Login</Button>

                    <Modal centered isOpen={this.state.isModalOpen} >
                        <ModalHeader className="modal-header-color" close={<a className="close link-underline" onClick={this.toggleModal}>
                            <i class="fa fa-times" aria-hidden="true"></i></a>} ><span className="modal-title">Log In</span>
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input} />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                            innerRef={(input) => this.remember = input} />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary" className='offset-md-10'>Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                </div>






            </IconContext.Provider>

        );
    }
}
export default Login