import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import styled from "styled-components";
import {
    Card,
    CardTitle,
    CardText,
    CardBody,
    CardHeader,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Col,
    Alert,
    Table,
} from "reactstrap";

function Reports(props) {
    const [clickedId, setClickedId] = useState(0);
    const [isModalOpen, toggleModal] = useState(false);
    const setTheModal = () => toggleModal(!isModalOpen);
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState({});
    const [isThesisCancelled, setThesisCancelled] = useState(false);

    const clicked = (thesisSerialNumber) => {
        for (let i = 0; i < reports.length; i++) {
            if (reports[i].thesisSerialNumber == thesisSerialNumber) {
                setSelectedReport(reports[i]);
            }
        }
        console.log(selectedReport);
        setTheModal();
    }



    const getReports = () => {
        Axios.get(`http://localhost:9000/supervisor/reports/${props.student.StudentId}`)
            .then((res) => {
                setReports(res.data);
                console.log(res.data)
            })
    }
    const thesisButton = ()=>{
        Axios.get(`http://localhost:9000/supervisor/cancelthesis/${props.student.thesisSerialNumber}`)
        .then((res) => {
            setThesisCancelled(res.data);
            console.log(res.data)
        })
    }

    useEffect(() => {
        getReports();
    }, [selectedReport]);

    return (
        <div>

            <div>
                <div className="mt-3 mb-3 container">
                    <Row className="justify-content-center">
                        <Col className="col-md-9 align-self-center">
                            <div>
                                <Row id="data-title" mb={5}>
                                    Thesis Information
                                </Row>
                                <FormGroup>
                                    <Row>
                                        <Label htmlFor="firstName" className="label" md={{ size: 3 }}>
                                            Student Name
                                        </Label>
                                        <Col md={8}>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                value={props.student.StudentFirstName + " " + props.student.StudentLastName}
                                            ></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label htmlFor="thesisTitle" className="label" md={{ size: 3 }}>
                                            Thesis Title
                                        </Label>
                                        <Col md={8}>
                                            <Input
                                                id="thesisTitle"
                                                name="thesisTitle"
                                                type="text"
                                                value={props.student.ThesisTitle}
                                            ></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Label htmlFor="years" className="label" md={{ size: 3 }}>
                                            Years Spent in Thesis
                                        </Label>
                                        <Col md={1}>
                                            <Input
                                                id="years"
                                                name="years"
                                                type="years"
                                                value={props.student.Years}
                                            ></Input>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Row className="justify-content-center">
                                    <Col md={3}>
                                        <Button variant="danger" onClick={()=>{thesisButton()}}>Cancel Thesis</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-3 mb-3 container">
                    <Row className="justify-content-center">
                        <Col className="col-md-9 align-self-center">
                            <div>
                                <Row id="data-title" mb={5}>
                                    Progress Reports
                                </Row>
                                <Row>
                                    <Table striped style={{ backgroundColor: "white", height: "300px" }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Report No.</th>
                                                <th>Date</th>
                                                <th>State</th>
                                                <th>Evaluation</th>
                                                <th>View&Evaluate</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {reports.map((item, index) => {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <th scope="row">{index}</th>
                                                        <td>{item.progressReportNumber}</td>
                                                        <td>{new Intl.DateTimeFormat("en-US", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "2-digit",
                                                        }).format(new Date(Date.parse(item.date)))}</td>
                                                        <td>{item.state}</td>
                                                        <td>{item.evaluation}</td>
                                                        <td>
                                                            <Button
                                                                onClick={() => {
                                                                    clicked(item.thesisSerialNumber);
                                                                }}
                                                            >
                                                                View
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <Modal centered isOpen={isModalOpen} toggle={setTheModal} >
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
                    Reports
                </ModalHeader>
                <ModalBody>
                    <div><label className="label">Report No.:
                        <span>{selectedReport.progressReportNumber}</span></label>
                    </div>
                    <div><label className="label">Student Name: </label>
                        <span>{selectedReport.firstName + " " + selectedReport.lastName}</span>
                    </div>
                    <div><label className="label">Date: </label>
                        <span>{selectedReport.date}</span>
                    </div>
                    <div><label className="label">Description: </label>
                        <span>{selectedReport.description}</span>
                    </div>
                    <div><label className="label">State: </label>
                        <span>{selectedReport.state}</span>
                    </div>
                    <label className="label">Evaluation: </label>
                    <input type="number" class="form-control" placeholder={selectedReport.evaluation}></input>
                </ModalBody>
            </Modal>
        </div>
    );
}
export default Reports;
