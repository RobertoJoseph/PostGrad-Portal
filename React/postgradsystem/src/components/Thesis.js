import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import Axios from "axios";

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
} from "reactstrap";
import * as IoIcons from "react-icons/io";
import * as TiIcons from "react-icons/ti";
import { useForm } from "react-hook-form";
import * as AiIcons from "react-icons/ai";

function Thesis(props) {
  const { register, handleSubmit } = useForm();
  const [thesis, setThesis] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [selectedThesis, setThesisIndex] = useState(0);
  const [isProgressAdded, setIsProgressAdded] = useState(false);
  const onClickButton = (serialNumber) => {
    setIsProgressAdded(false);
    setThesisIndex(serialNumber);
    setTheModal();
  };

  const addProgressReport = (values) => {
    Axios.post("http://localhost:9000/students/addprogressreport", {
      serialNumber: selectedThesis,
      progressReportDate: values.date,
      progressReportDescription: values.description,
    })
      .then((response) => {
        if (response.data.isProgressAdded) {
          setIsProgressAdded(true);
        }
        console.log(response);
        // alert("Progress Report Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/studenttheses/${props.studentID}`
    ).then((res) => {
      setThesis(res.data);
    });
  }, []);

  return (
    <div className="row">
      {thesis.map((item, index) => {
        return (
          <div key={index} className="col-6 mt-3 mb-3">
            <Card
              id="Card"
              className="border-0"
              style={{ backgroundColor: "white" }}
            >
              <CardHeader
                id="CardHeader"
                style={{ backgroundColor: "#151F31" }}
              >
                <span style={{ color: "white" }}>
                  Thesis&nbsp;&nbsp;No. {index + 1}&nbsp; :&nbsp;&nbsp;{" "}
                  {item.title}
                </span>
              </CardHeader>
              <CardBody id="CardBody" style={{ backgroundColor: "white" }}>
                <dl className="row p-1">
                  <dt className="col-6">Type</dt>
                  <dd className="col-6">{item.type}</dd>
                  <dt className="col-6">Field</dt>
                  <dd className="col-6">{item.field}</dd>
                  <dt className="col-6">Title</dt>
                  <dd className="col-6">{item.title}</dd>
                  <dt className="col-6">Start Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.startDate)))}
                  </dd>
                  <dt className="col-6">End Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.endDate)))}
                  </dd>
                  <dt className="col-6">Grade</dt>
                  <dd className="col-6">{item.grade}</dd>
                  <dt className="col-6">Defense Date</dt>
                  <dd className="col-6">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.defenseDate)))}
                  </dd>
                </dl>
                {/* Compare between two dates if the endDate>=today ==> create Button else null */}
                {/* --------------- */}
                {new Date(item.endDate).getTime() >= new Date().getTime() ? (
                  <Button
                    onClick={() => {
                      onClickButton(item.serialNumber);
                    }}
                  >
                    <TiIcons.TiDocumentAdd size="18px"></TiIcons.TiDocumentAdd>{" "}
                    Add Progress Report
                  </Button>
                ) : null}
              </CardBody>
            </Card>
          </div>
        );
      })}
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
          Add Progress Report
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(addProgressReport)}>
            <FormGroup>
              <Label htmlFor="date">Date</Label>
              <input
                type="date"
                id="date"
                name="date"
                ref={register}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <input
                type="textarea"
                id="textarea"
                name="description"
                ref={register}
                className="form-control"
              />
            </FormGroup>
            {isProgressAdded ? (
              <Alert color="success">Progress Report Added Successfully</Alert>
            ) : null}
            <input
              type="submit"
              value="Submit"
              className="form-control btn-primary"
            />
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default Thesis;
