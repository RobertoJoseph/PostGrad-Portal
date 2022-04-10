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
} from "reactstrap";
import * as AiIcons from "react-icons/ai";

function Publications(props) {
  const [publications, setPublications] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);
  const setTheModal = () => toggleModal(!isModalOpen);
  const [publicationId, setPublicationID] = useState(0);
  const [thesisSerialNumber, setThesisSerialNumber] = useState(0);
  const [thesis, setThesis] = useState([]);

  const createSelectItems = () => {
    console.log("This is thesis: ", thesis);
    console.log("this is thesis of 0: ", thesis[0]);
    let items = [];
    for (let i = 0; i <= thesis.length; i++) {
      items.push(
        <option key={i} value={i}>
          {thesis[i] ? thesis[i].field : null}
        </option>
      );
    }
    return items;
  };
  const onDropdownSelected = (e) => {
    console.log("THE VAL", e.target.value);
  };

  const onClickButton = (thesisSerialNumber, publicationIdNumber) => {
    setPublicationID(publicationIdNumber);
    setThesisSerialNumber(thesisSerialNumber);
    setTheModal();
  };

  const getallThesis = () => {
    Axios.get(
      `http://localhost:9000/students/studenttheses/${props.studentID}`
    ).then((res) => {
      setThesis(res.data);
    });
  };
  const viewStudentPublications = () => {
    Axios.get(
      `http://localhost:9000/students/viewStudentPublications/${props.studentID}`
    ).then((res) => {
      setPublications(res.data);
    });
  };
  useEffect(() => {
    viewStudentPublications();
    getallThesis();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-3 ">
          <Button>
            {" "}
            <AiIcons.AiFillFileAdd></AiIcons.AiFillFileAdd> HI
          </Button>
        </div>
        {publications.map((item, index) => {
          return (
            <div key={index} className="col-6 mt-3 mb-3">
              <Card
                id="Card"
                className="border-0"
                style={{ backgroundColor: "white", minHeight: "200px" }}
              >
                <CardHeader
                  id="CardHeader"
                  style={{ backgroundColor: "#151F31" }}
                >
                  <span style={{ color: "white" }}>
                    <Button
                      style={{ border: "none", background: "transparent" }}
                      onClick={setTheModal}
                    >
                      <AiIcons.AiOutlineLink size="30px"></AiIcons.AiOutlineLink>
                    </Button>
                    {"                          "}
                    Publication&nbsp;&nbsp;No. {index + 1}&nbsp; :&nbsp;&nbsp;{" "}
                    {item.title}
                  </span>
                </CardHeader>
                <CardBody id="CardBody" style={{ backgroundColor: "white" }}>
                  <dl className="row p-1">
                    <dt className="col-6">Place</dt>
                    <dd className="col-6">{item.place}</dd>
                    <dt className="col-6">Host</dt>
                    <dd className="col-6">{item.host}</dd>
                    <dt className="col-6">Date</dt>
                    <dd className="col-6">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(item.date)))}
                    </dd>
                  </dl>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      <Modal isOpen={isModalOpen} toggle={setTheModal} centered>
        <ModalHeader
          toggle={setTheModal}
          style={{ backgroundColor: "#081A2D", color: "white" }}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="close link-underline" onClick={setTheModal}>
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          {" "}
          Add Publication
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Select Thesis</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={onDropdownSelected}
              >
                {createSelectItems()}
              </Input>
            </FormGroup>
            <Input type="submit" className="btn-primary" value="Submit"></Input>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default Publications;
