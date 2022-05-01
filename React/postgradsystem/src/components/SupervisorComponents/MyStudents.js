import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
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
import { Control, Form } from "react-redux-form";

function MyStudents(props) {
  const [students, setStudents] = useState([]);
  const [clickedId, setClickedId] = useState(0);
  const [isPublicationModalOpen, togglePublicationModal] = useState(false);
  const setPublicationModal = () =>
    togglePublicationModal(!isPublicationModalOpen);
  const [isDefenseModalOpen, toggleDefenseModal] = useState(false);
  const setDefenseModal = () => toggleDefenseModal(!isDefenseModalOpen);
  const [publications, setPublications] = useState([]);
  const [examiners, setExaminers] = useState([]);
  const [examinerId, setExaminerId] = useState(16);
  const [examinerName, setExaminerName] = useState("");
  const [isDefenseAdded, setDefenseAdded] = useState(false);

  const publicationButtton = (id) => {
    setClickedId(id);
    getPublications();
    setPublicationModal();
  };
  const defenseButton = (serialNumber) => {
    setClickedId(serialNumber);
    getExaminers();
    setDefenseModal();
    console.log(examiners);
  };
  const reportsButton = (student) => {
    props.func(student);
  };

  const getStudents = () => {
    Axios.get(
      `http://localhost:9000/supervisor/mystudents/${props.supervisorId}`
    ).then((res) => {
      setStudents(res.data);
    });
  };
  const getPublications = () => {
    Axios.get(
      `http://localhost:9000/supervisor/publications/${clickedId}`
    ).then((res) => {
      setPublications(res.data);
    });
  };
  const getExaminers = () => {
    Axios.get(`http://localhost:9000/supervisor/examiners`).then((res) => {
      setExaminers(res.data);
    });
  };

  const Submit1 = (values) => {
    console.log("VALUESSSS" + values);
    setExaminerName(values.examinerName);
    console.log(values.defenseDate);

    Axios.post("http://localhost:9000/supervisor/addDefense", {
      thesisSerialNumber: clickedId,
      examinerId: examinerId,
      defenseDate: values.defenseDate,
      defenseLocation: values.defenseLocation,
      comment: values.comment,
    })
      .then((response) => {
        setDefenseAdded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const Submit2 = (values) => {
  //   for (let i = 0; i < examiners.length; i++) {
  //     if (examiners[i].examinerName === examinerName) {
  //       setExaminerId(examiners[i].examinerId);
  //       break;
  //     }
  //   }
  //   console.log(examinerId);
  // };

  const createSelectItems = () => {
    //Make array carry the thesisTitle and its serialNumber

    let items = [];
    for (let i = 0; i <= examiners.length; i++) {
      items.push(
        <option key={i} value={i}>
          {examiners[i] ? examiners[i].examinerName : null}
        </option>
      );
    }
    return items;
  };

  useEffect(() => {
    getStudents();
    getExaminers();
  }, []);

  useEffect(() => {
    getPublications();
  }, [clickedId, examinerId, isDefenseAdded, examinerName]);

  return (
    <div className="col-12 mt-3">
      <Table striped style={{ backgroundColor: "white", height: "300px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Thesis Title</th>
            <th>Years</th>
            <th>Publications</th>
            <th>Add Defense</th>
            <th>Reports</th>
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
                <td>
                  <Button
                    onClick={() => {
                      publicationButtton(item.StudentId);
                    }}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      console.log("id is: " + item.StudentId);
                      defenseButton(item.thesisSerialNumber);
                    }}
                  >
                    Add
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      console.log(item);
                      reportsButton(item);
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
      <Modal
        size="lg"
        centered
        isOpen={isPublicationModalOpen}
        toggle={setPublicationModal}
      >
        <ModalHeader
          style={{ backgroundColor: "#081A2D", color: "white" }}
          toggle={setPublicationModal}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="close link-underline" onClick={setPublicationModal}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          Publications
        </ModalHeader>
        <ModalBody>
          <Table striped style={{ backgroundColor: "white", height: "300px" }}>
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
                    <td>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(item.date)))}
                    </td>
                    <td>{item.place}</td>
                    <td>
                      {(item.isAccepted = 0 ? "Not Accepted" : "Accepted")}
                    </td>
                    <td>{item.host}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>{" "}
        </ModalBody>
      </Modal>
      <Modal
        size="lg"
        centered
        isOpen={isDefenseModalOpen}
        toggle={setDefenseModal}
      >
        <ModalHeader
          style={{ backgroundColor: "#081A2D", color: "white" }}
          toggle={setDefenseModal}
          close={
            <a className="close link-underline" onClick={setDefenseModal}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          Add Defense
        </ModalHeader>
        <ModalBody>
          <Form model="defenseForm" onSubmit={(values) => Submit1(values)}>
            <FormGroup>
              <Row>
                <Label htmlFor="defenseDate">Select Date:</Label>
                <Control
                  type="date"
                  name="defenseDate"
                  id="defenseDate"
                  placeholder="Enter Date"
                  className="form-control"
                  model=".defenseDate"
                ></Control>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label htmlFor="defenseLocation">Select Location:</Label>
                <Control.text
                  type="text"
                  className="form-control"
                  name="defenseLocation"
                  id="defenseLocation"
                  model=".defenseLocation"
                />
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label htmlFor="comment">Leave a comment:</Label>
                <Control.text
                  type="text"
                  className="form-control"
                  id="comment"
                  name="comment"
                  model=".comment"
                ></Control.text>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="examinerName">Select Examiner:</Label>
              <Control.select
                id="examinerName"
                name="examinerName"
                type="select"
                model=".examinerName"
                className="form-control"
                onChange={(e) => {
                  console.log("HEYYEYYE: " + e.target.value);
                  setExaminerId(examiners[e.target.value].examinerId);
                }}
              >
                {createSelectItems()}
              </Control.select>
            </FormGroup>

            {isDefenseAdded ? (
              <Alert color="success">Defense Added Successfully</Alert>
            ) : null}
            <Input type="submit" className="btn-primary" value="Submit"></Input>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default MyStudents;
