import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import "../../css/newNav.css";

import Axios from "axios";
import styled from "styled-components";
import { Control } from "react-redux-form";
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

function NewReports(props) {
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});
  const [isReportChosen, setReportChosen] = useState(false);

  const getReports = () => {
    Axios.get(`http://localhost:9000/supervisor/viewallreports`).then((res) => {
      setReports(res.data);
    });
  };
  const clickButton = (studentId, progressReportNumber) => {
    setReportChosen(false);
    Axios.post(`http://localhost:9000/supervisor/choosereport`, {
      studentId,
      progressReportNumber,
      supervisorId: props.supervisorId,
    }).then((res) => {
      console.log("This is the backendresult " + res.data.succeeded);
      if (res.data.succeeded) {
        setReportChosen(true);
      }
    });
  };

  useEffect(() => {
    getReports();
  }, []);
  useEffect(() => {
    getReports();
  }, [isReportChosen]);

  return (
    <div className="mt-3 mb-3 container">
      <Row className="justify-content-center">
        <Col className="col-md-9 align-self-center">
          <div>
            <Row id="data-title" mb={5}>
              All Progress Reports
            </Row>
            <Row>
              <Table striped>
                <thead>
                  <tr className="tableHeader" align="center">
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Report Number</th>
                    <th>Date</th>
                    <th>Choose Report</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((item, index) => {
                    return (
                      <tr key={index} id={index} align="center">
                        <th scope="row">{index}</th>
                        <td>{item.firstName + " " + item.lastName}</td>
                        <td>{item.progressReportNumber}</td>
                        <td>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(new Date(Date.parse(item.date)))}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              clickButton(
                                item.studentId,
                                item.progressReportNumber
                              );
                            }}
                          >
                            Take Report
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {isReportChosen ? (
                <Alert color="success">
                  Report got added to your reports successfully!
                </Alert>
              ) : null}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default NewReports;
