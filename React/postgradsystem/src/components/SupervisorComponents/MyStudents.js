import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import styled from "styled-components";
import SupervisorPublications from "./SupervisorPublications";
import { useNavigate } from "react-router-dom";
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


function MyStudents(props) {
  const [students, setStudents] = useState([]);
  const [clickedId, setClickedId] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [publications, setPublications] = useState([]);
  const clickMe = (id) => {
    console.log("clickMe: " + id);
    console.log(clickedId);
    setClickedId(id);
    getPublications();
    console.log(clickedId);
    setTheModal();
    //    navigate(`/supervisorpublications/${id}`);
  }




  const getPublications = () => {
    Axios.get(
      `http://localhost:9000/supervisor/publications/${clickedId}`
    ).then((res) => {
      setPublications(res.data);
      console.log(res.data);
    });
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

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/supervisor/mystudents/${props.supervisorId}`
    ).then((res) => {
      setStudents(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/supervisor/publications/${clickedId}`
    ).then((res) => {
      setPublications(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="col-12 mt-3">
      <Table striped style={{ backgroundColor: 'white', height: '300px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Thesis Title</th>
            <th>Years</th>
            <th>Publications</th>
          </tr>
        </thead>

        <tbody>
          {students.map((item, index) => {
            return (
              <tr key={index} id={index}>
                <th scope="row">{index}</th>
                <td>{item.StudentFirstName + " " + item.StudentLastName}</td>
                <td>{item.ThesisTitle}</td>
                <td>{item.Years}</td>
                <td><Button onClick={() => {
                  console.log("id is: " + item.StudentId)
                  setClickedId(item.StudentId)
                  clickMe(item.StudentId);
                }}>View</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal size="lg" centered isOpen={isModalOpen} toggle={setTheModal}>
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
          Publications
        </ModalHeader>
        <ModalBody>
          <Table striped style={{ backgroundColor: 'white', height: '300px' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th>Place</th>
                <th>State</th>
                <th>Host</th>
              </tr>
            </thead>

            <tbody>
              {publications.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.date)))}</td>
                    <td>{item.place}</td>
                    <td>{item.isAccepted = 0 ? "Not Accepted" : "Accepted"}</td>
                    <td>{item.host}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>        </ModalBody>
      </Modal>
    </div>
  );


}
export default MyStudents;
