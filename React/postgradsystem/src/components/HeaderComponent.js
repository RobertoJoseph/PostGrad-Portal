import React, { Component } from 'react'
import { Nav, Navbar, Container, NavbarBrand,NavbarText, NavLink, NavbarToggler, Col, Collapse, NavItem, ModalFooter, Modal, ModalBody, Button, ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';

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
                <Navbar fixed="top"
                    dark
                >
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/GUC.png' height="40" width="100" alt='German University in Cairo' />
                    </NavbarBrand>

                </Navbar>
            </div>


        );
    }
}
export default Header;