import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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
  const [isPublicationModalOpen, togglePublicationModal] = useState(false); 
  const setPublicationModal = () => togglePublicationModal(!isPublicationModalOpen);
  const [isDefenseModalOpen, toggleDefenseModal] = useState(false); 
  const setDefenseModal = () => toggleDefenseModal(!isDefenseModalOpen);
  const [publications, setPublications] = useState([]); 
  const [examiners, setExaminers] = useState([]); 
  const [examinerId, setExaminerId] = useState(0); 
  const [isDefenseAdded, setDefenseAdded] = useState(false); 
  const { register, handleSubmit } = useForm();

  const publicationButtton = (id) => {
    setClickedId(id);
    getPublications();
    setPublicationModal();
  };
  const defenseButton = (serialNumber) => {
    setClickedId(serialNumber);
    getExaminers();
    setDefenseModal();
    console.log(examiners)
  };

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
    Axios.get(
      `http://localhost:9000/supervisor/examiners`
    ).then((res) => {
      setExaminers(res.data);
    });
  };
  const addDefense = (values) => {
    for(let i=0;i<examiners.length;i++){
      if(examiners[i].examinerName===values.examinerName){
        setExaminerId(examiners[i].examinerId)
      }
    }
    console.log(examinerId);
    console.log(values.defenseDate)
    console.log(values.examinerName)

    Axios.post("http://localhost:9000/supervisor/addDefense", {
      thesisSerialNumber: clickedId,
      examinerId: examinerId,
      defenseDate: values.defenseDate,
      defenseLocation: values.defenseLocation,
      comment: values.comment
    })
      .then((response) => {
        setDefenseAdded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getStudents();
    getPublications();
    getExaminers();
  }, [clickedId,examinerId,isDefenseAdded]);

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
                      console.log("id is: " + item.StudentId);
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
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal size="lg" centered isOpen={isPublicationModalOpen} toggle={setPublicationModal} >
        <ModalHeader
          style={{ backgroundColor: "#081A2D", color: "white" }}
          toggle={setPublicationModal}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="close link-underline" onClick={setPublicationModal}>
              <i class="fa fa-times" aria-hidden="true"></i>
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
      <Modal size="lg" centered isOpen={isDefenseModalOpen} toggle={setDefenseModal} >
        <ModalHeader
          style={{ backgroundColor: "#081A2D", color: "white" }}
          toggle={setDefenseModal}
          close={
            <a className="close link-underline" onClick={setDefenseModal}>
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          Add Defense
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={handleSubmit(addDefense)}>
              <FormGroup>
                <Row>
                  <Label htmlFor="defenseDate" className="col-3">
                    Select Date:
                  </Label>
                  <input type="date" className="col-7" id="defenseDate" name="defenseDate">
                  </input>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                <Label htmlFor="defenseLocation" className="col-3">
                    Select Location:
                  </Label>
                  <input type="text" className="col-7" id="defenseLocation" name="defenseLocation">
                  </input>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                <Label htmlFor="comment" className="col-3">
                    Leave a comment:
                  </Label>
                  <input type="text" className="col-7" id="comment" name="comment">
                  </input>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                  <Label htmlFor="examinerName" className="col-3">
                    Select Examiner:
                  </Label>
                  <Col md={9}>
                    <select
                      id="examinerName"
                      name="examinerName"
                      type="select"
                      ref={register}
                      className="form-control"
                      >
                      {examiners.map((item, index) => {
                        return <option>{item.examinerName}</option>;
                      })}
                    </select>
                  </Col>
                </Row>
              </FormGroup>

              {isDefenseAdded ? (
                <Alert color="success">Course Added Successfully</Alert>
              ) : null}
              <input
                type="submit"
                value="Add Defense"
                className="form-control btn-primary"
              />
            </Form>
          </ModalBody>
      </Modal>
    </div>
  );
}
export default MyStudents;
