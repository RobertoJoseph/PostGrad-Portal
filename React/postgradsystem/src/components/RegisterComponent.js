import React, { Component } from 'react';
import Home from './HomeComponent';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { IconContext } from 'react-icons';
import classnames from 'classnames';



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: true,
            currentActiveTab: '1'
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    toggle = tab => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({
                currentActiveTab: tab
            })
        } 
    }

    render() {
        this.toggle = this.toggle.bind(this);
        return (
            <React.Fragment>



                <IconContext.Provider value={{ color: '#fff' }}>
                    <div>
                        <Home></Home>
                        <Modal centered isOpen={this.state.isModalOpen} >
                            <ModalHeader className="modal-header-color" close={<a className="close link-underline" onClick={this.toggleModal}>X</a>} ><span className="modal-title">Sign Up</span></ModalHeader>
                            <ModalBody>
                                <div>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink className={classnames({ active: this.state.currentActiveTab === '1' })} onClick={() => { this.toggle('1'); }} >
                                                Tab1
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={classnames({ active: this.state.currentActiveTab === '2' })} onClick={() => { this.toggle('2'); }} >
                                                Tab2
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent currentActiveTab={this.state.currentActiveTab}>                                        
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                { this.state.currentActiveTab === '1' ? <h4>Tab 1 Contents</h4> : null }
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                { this.state.currentActiveTab === '2' ? <h4>Tab 2 Contents</h4> : null }
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
}
export default Register;