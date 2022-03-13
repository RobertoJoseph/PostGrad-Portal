import React, { Component } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import {

  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col

} from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleLogin(values) {
    //this.toggleModal();
    // alert(
    //   "Username: " +
    //     this.username.value +
    //     " Password: " +
    //     this.password.value +
    //     " Remember: " +
    //     this.remember.checked
    // );
    this.props.userLogin(values.email, values.password);
  }

  render() {
    return (
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
          <Button className="bt2 bg-success button " onClick={this.toggleModal}>
            <FaIcons.FaSignInAlt></FaIcons.FaSignInAlt> Login
          </Button>
          <Modal centered isOpen={this.state.isModalOpen}>
            <ModalHeader
              className="modal-header-color"
              close={
                <a className="close link-underline" onClick={this.toggleModal}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </a>
              }
            >
              <span className="modal-title">Log In</span>
            </ModalHeader>
            <ModalBody>
              <Form model="loginForm" onSubmit={(values) => this.handleLogin(values)}>
                <Row className="form-group">
                  <Label htmlFor="email" md={2}>E-mail</Label>
                  <Col md={10}>
                    <Control.text model=".email" id="email" name="email" className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="password" md={2}>Password</Label>
                  <Col md={10}>
                    <Control.text model=".password" id="password" name="password" className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Log In
                    </Button>
                  </Col>
                </Row>

              </Form>
            </ModalBody>
          </Modal>
        </div>
      </IconContext.Provider>
    );
  }
}
export default Login;