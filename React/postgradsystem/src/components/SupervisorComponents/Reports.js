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
    const clickMe = (id) => {
        setClickedId(id);
        setTheModal();
    };
    const clicked = (thesisSerialNumber) => {
        for (let i = 0; i < reports.length; i++) {
            if (reports[i].thesisSerialNumber == thesisSerialNumber) {
                setSelectedReport(reports[i]);
            }
        }
        console.log(selectedReport);
        setTheModal();
    }

    const Button = styled.button`
    background-color: #243b55;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: #243b55;
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;

    const ButtonToggle = styled(Button)`
    opacity: 0.7;
    ${({ active }) =>
            active &&
            `
    opacity: 1; 
  `}
  `;


    const getReports = () => {
        Axios.get(`http://localhost:9000/supervisor/reports/${props.supervisorId}`)
            .then((res) => {
                setReports(res.data);
                console.log(res.data)
            })
    }

    useEffect(() => {
        getReports();
    }, [selectedReport]);

    return (
        <div className="col-12 mt-3">
            <Table striped style={{ backgroundColor: "white", height: "300px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Thesis Title</th>
                        <th>Report No.</th>
                        <th>Evaluation</th>
                        <th>View&Evaluate</th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map((item, index) => {
                        return (
                            <tr key={index} id={index}>
                                <th scope="row">{index}</th>
                                <td>{item.firstName + " " + item.lastName}</td>
                                <td>{item.ThesisTitle}</td>
                                <td>{item.progressReportNumber}</td>
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
                    <span>{selectedReport.firstName+" "+selectedReport.lastName}</span>
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
