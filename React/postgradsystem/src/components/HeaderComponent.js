import React, { Component } from 'react'
import { Nav, Navbar, Container, NavbarBrand, NavbarText, NavbarToggler, Col, Collapse, NavItem, ModalFooter, Modal, ModalBody, Button, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false

        }
        this.toggleNav = this.toggleNav.bind(this);
    }



    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (
            <div>
                <div className="Jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col col-sm-1 minilogo">

                                <img src='assets/images/minilogo.png' alt="GUC" height="30" width="30"  />

                            </div>
                            <div className="col col-sm-8">
                                <h2>German University in Cairo   /   <small>Post-Grad Office</small> </h2>
                            </div>
                            <div className='col col-sm-3'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default Header;