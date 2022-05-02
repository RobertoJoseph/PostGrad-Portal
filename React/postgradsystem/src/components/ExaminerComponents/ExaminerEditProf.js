import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Alert,
} from "reactstrap";
import Axios from "axios";
import "../../css/newNav.css";
import { Control, Form, Errors, actions } from "react-redux-form";

function ExaminerEditProfile(props) {
  console.log("Component is rerenderd");
  const [isModalOpen, toggleModal] = useState(false);
  const [examinerData, setData] = useState([props.examinerData]);
  const [infoUpdated, setInfo] = useState(false);
  const setTheModal = () => {
    toggleModal(!isModalOpen);
  };
  console.log("This is props: ", props.examinerData);
  const changeInformation = (values) => {
    console.log(values);
    Axios.post(
      `http://localhost:9000/examiner/changeinformation/${props.examinerID}`,
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }
    )
      .then((response) => {
        console.log(response.data.isUpdated);
        if (response.data.isUpdated) {
          setInfo(true);
        } else {
          setInfo(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    Axios.get(
      `http://localhost:9000/examiner/examinerdata/${props.examinerID}`
    ).then((res) => {
      setData(res.data);
    });
  }, [infoUpdated]);
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      {console.log("Iam here inside the return")}
      <div>
        <div className="mt-5 mb-5 container">
          <div>
            <Row id="data-title" mb={5}>
              {examinerData[0].name}
            </Row>
            <FormGroup>
              <Row>
                <Label htmlFor="firstName" md={{ size: 2 }}>
                  Name
                </Label>
                <Col md={3}>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    // onChange={(e) => {
                    //   setData({
                    //     ...examinerData,
                    //     name: e.target.value,
                    //   });
                    // }}
                    value={examinerData[0].name}
                  ></Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label htmlFor="email" md={{ size: 2 }}>
                  Email
                </Label>
                <Col md={3}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={examinerData[0].email}
                  ></Input>
                </Col>
                <Label htmlFor="address" md={{ offset: 1, size: 2 }}>
                  Field Of Work
                </Label>
                <Col md={3}>
                  <Input
                    id="fieldOfWork"
                    name="fieldOfWork"
                    type="text"
                    value={examinerData[0].fieldOfWork}
                  ></Input>
                </Col>
              </Row>
            </FormGroup>
          </div>
          <div className="mt-5">
            <Row>
              <Col md={{ offset: 9, size: 2 }}>
                <Button onClick={setTheModal}>Edit Information</Button>
              </Col>
            </Row>
          </div>
        </div>
        <Modal centered isOpen={isModalOpen} toggle={setTheModal}>
          <ModalHeader
            style={{ backgroundColor: "#081A2D", color: "white" }}
            toggle={setTheModal}
            close={
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="close link-underline" onClick={setTheModal}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          >
            Edit Information
          </ModalHeader>
          <ModalBody>
            <Form
              model="examinerForm"
              onSubmit={(values) => changeInformation(values)}
            >
              <FormGroup>
                <Label htmlFor="name">Old Password</Label>
                <Control.text
                  type="oldPassword"
                  id="oldPassword"
                  name="oldPassword"
                  model=".oldPassword"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fieldOfWork">New Password</Label>
                <Control.text
                  type="newPassword"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  model=".newPassword"
                />
              </FormGroup>
              <Input
                type="submit"
                value="Save"
                className="form-control btn-primary"
              />
            </Form>
            {console.log("This is infoUpdated: " + infoUpdated)}
            {infoUpdated ? (
              <Alert color="success">Password Updated Successfully</Alert>
            ) : null}
          </ModalBody>
        </Modal>
      </div>
    </IconContext.Provider>
  );
}

export default ExaminerEditProfile;
