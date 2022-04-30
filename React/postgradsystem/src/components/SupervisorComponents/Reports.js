import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import styled from "styled-components";
import { Control, Form } from "react-redux-form";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardHeader,
  Row,
  Button,
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
  const [value, setValue] = useState(0);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const clicked = (thesisSerialNumber, progressReportNumber) => {
    setIsEvaluated(false);
    setTheModal();
    for (let i = 0; i < reports.length; i++) {
      if (reports[i].thesisSerialNumber == thesisSerialNumber) {
        setSelectedReport(reports[i]);
        // setValue(selectedReport.evaluation);
        break;
      }
    }
  };

  const getReports = () => {
    Axios.get(
      `http://localhost:9000/supervisor/reports/${props.student.StudentId}`
    ).then((res) => {
      setReports(res.data);
      console.log(res.data);
    });
  };
  const thesisButton = () => {
    Axios.post(
      `http://localhost:9000/supervisor/cancelthesis/${props.student.thesisSerialNumber}`
    ).then((res) => {
      setThesisCancelled(res.data);
      console.log(res.data);
    });
  };
  const handleSubmit = (values) => {
    // console.log("HEE: " + values);
    Axios.post("http://localhost:9000/supervisor/evaluate", {
      studentID: props.student.StudentId,
      progressReportNumber: selectedReport.progressReportNumber,
      evaluation: values.grade,
    }).then((res) => {
      if (res.data.isEvaluated) {
        setIsEvaluated(true);
      }
    });
  };

  useEffect(() => {
    getReports();
  }, []);
  useEffect(() => {
    getReports();
  }, [isEvaluated]);

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
                    <Label
                      htmlFor="firstName"
                      className="label"
                      md={{ size: 3 }}
                    >
                      Student Name
                    </Label>
                    <Col md={8}>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={
                          props.student.StudentFirstName +
                          " " +
                          props.student.StudentLastName
                        }
                      ></Input>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Label
                      htmlFor="thesisTitle"
                      className="label"
                      md={{ size: 3 }}
                    >
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
                {isThesisCancelled ? (
                  <Alert color="success">Thesis Cancelled Successfully</Alert>
                ) : null}
                <Row className="justify-content-center">
                  <Col md={3}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        thesisButton();
                      }}
                    >
                      Cancel Thesis
                    </Button>
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
                  <Table
                    striped
                    style={{ backgroundColor: "white", height: "300px" }}
                  >
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
                            <td>
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(new Date(Date.parse(item.date)))}
                            </td>
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
          Evaluate Report No. {selectedReport.progressReportNumber}
        </ModalHeader>
        <ModalBody>
          <div>
            <Form
              model="evaluateProgressReport"
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <FormGroup>
                <Row>
                  <Label
                    htmlFor="description"
                    className="label"
                    md={{ size: 5 }}
                  >
                    Report description:
                  </Label>
                </Row>
                <Row>
                  <Col md={11}>
                    <Control.text
                      id="description"
                      name="description"
                      type="text"
                      model=".description"
                      value={selectedReport.description}
                    ></Control.text>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label className="label">
                  Grade:<span style={{ fontWeight: "bold" }}>{value}</span>{" "}
                </Label>
                <Control
                  type="range"
                  min={0}
                  max={10}
                  className="slider red"
                  model=".grade"
                  onChange={(values) => {
                    setValue(values.target.value);
                  }}
                ></Control>
              </FormGroup>
              {isEvaluated ? (
                <Alert color="success">Evaluation Successful</Alert>
              ) : null}

              <Input
                type="submit"
                className="btn-primary"
                value="Submit"
              ></Input>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default Reports;
