import React, { useState, useEffect } from 'react'

import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
import * as AiIcons from "react-icons/ai";
import {
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col,
    Form, FormGroup, Input, InputGroup
} from 'reactstrap';
import Axios from "axios";
import "../css/newNav.css";





function StudentEdit(props) {

    const [data, setData] = useState([]);
    
    const [isModalOpen, toggleModal] = useState(false);
    const setTheModal = () => {
        toggleModal(!isModalOpen);
        setIsPasswordUpdated(false);
    }
    const { register, handleSubmit } = useForm();
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);



    const changePassword = (values) => {
        Axios.post("http://localhost:9000/students/changepassword", {
            studentID: props.studentID,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        })
            .then((response) => {
                if (response.data.isPasswordUpdated) {
                    setIsPasswordUpdated(true);
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        Axios.get(
            `http://localhost:9000/students/studentdata/${props.studentID}`
        ).then((res) => {
            setData(res.data);
        });
    }, []);


    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div>

                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div  className="mt-5 mb-5 container">
                                <div>
                                    <Row id='data-title' mb={5} >Personal Information</Row>
                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="firstName" md={{ size: 2 }}>First Name</Label>
                                            <Col md={3}>
                                                <Input id="firstName" name="firstName" type="text" value={item.firstName}></Input>
                                            </Col>
                                            <Label htmlFor="lastName" md={{ offset: 1, size: 2 }}>Last Name</Label>
                                            <Col md={3}>
                                                <Input id="lastName" name="lastName" type="text" value={item.lastName}></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="email" md={{ size: 2 }}>Email</Label>
                                            <Col md={3}>
                                                <Input id="email" name="email" type="email" value={item.email}></Input>

                                            </Col>
                                            <Label htmlFor="address" md={{ offset: 1, size: 2 }}>Address</Label>
                                            <Col md={3}><Input id="address" name="address" type="text" rows="3" value={item.address} ></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="faculty" md={{ size: 2 }}>Faculty</Label>
                                            <Col md={3}>
                                                <Input id="faculty" name="faculty" type="text" value={item.faculty}></Input>
                                            </Col>

                                            <Label htmlFor="gpa" md={{ offset: 1, size: 2 }}>GPA</Label>
                                            <Col md={3}>
                                                <Input id="gpa" name="gpa" type="text" value={item.GPA}></Input>
                                            </Col>

                                        </Row>
                                    </FormGroup>
                                </div>
                                <div className='mt-5'>
                                    <Row>
                                        <Col md={{ offset: 9, size: 2 }}>
                                            <Button onClick={setTheModal}>
                                                Change Password
                                            </Button>
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
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </a>
                                    }
                                >
                                    Change My Password
                                </ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={handleSubmit(changePassword)}>
                                        <FormGroup>
                                            <Label htmlFor="oldPassword">Old Password</Label>
                                            <input
                                                type="password"
                                                id="oldPassword"
                                                name="oldPassword"
                                                ref={register}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                ref={register}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        {isPasswordUpdated ? (
                                            <p style={{ color: "green" }}>
                                                {" "}
                                                <AiIcons.AiFillCheckCircle></AiIcons.AiFillCheckCircle>
                                                Password Updated Successfully
                                            </p>
                                        ) : null}
                                        <input
                                            type="submit"
                                            value="Save"
                                            className="form-control btn-primary"
                                        />
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                    );
                })}





            </div>

        </IconContext.Provider>

    );

}
export default StudentEdit;