/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
} from "reactstrap";
import * as AiIcons from "react-icons/ai";
import { Control, Form } from "react-redux-form";

function Publications(props) {
  const [publications, setPublications] = useState([]);
  const [modalLinkPublication, toggleModal] = useState(false);
  const [thesis, setThesis] = useState([]);
  const setModalLinkPublication = () => toggleModal(!modalLinkPublication);
  const [publicationId, setPublicationID] = useState(0); //state 3
  const [thesisSerialNumber, setThesisSerialNumber] = useState(0); //state 4
  const [thesisTitle, setThesisTitle] = useState("");
  const [isPublicationAdded, setIsPublicationAdded] = useState(false);
  const [modalAddPublication, setModal] = useState(false);
  const setModalAddPublication = () => setModal(!modalAddPublication);
  const [isPublicationLinked, setIsPublicationLinked] = useState(false);
  const [isPublicationExists, setPublicationExists] = useState(false);
  const [items, setItems] = useState([]);

  const addPublication = (values) => {
    Axios.post(
      `http://localhost:9000/students/addpublication/${props.studentID}`,
      {
        publicationTitle: values.publicationTitle,
        host: values.host,
        place: values.place,
        date: values.date,
        isAccepted: values.isAccepted,
      }
    )
      .then((response) => {
        if (response.data.isPublicationAdded) {
          setIsPublicationAdded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const linkPublication = (values) => {
    Axios.post("http://localhost:9000/students/linkpublication", {
      publicationId: publicationId,
      thesisSerialNumber: thesisSerialNumber,
    })
      .then((response) => {
        console.log("This is the data: " + response.data.isPublicationLinked);
        if (response.data.isPublicationLinked) {
          setIsPublicationLinked(true);
        } else {
          console.log(
            "This is response but with else part: " +
              response.data.isPublicationLinked
          );
          setPublicationExists(true);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createSelectItems = () => {
    //Make array carry the thesisTitle and its serialNumber
    let items = [];
    items.push(<option>Select Thesis</option>);
    for (let i = 0; i <= thesis.length; i++) {
      if (thesis[i] == undefined) {
        break;
      }
      items.push(
        <option key={i} value={i}>
          {thesis[i] ? thesis[i].title : null}
        </option>
      );
    }
    return items;
  };

  const onClickButton = (id) => {
    setPublicationExists(false);
    setIsPublicationLinked(false);
    setPublicationID(id);
    setModalLinkPublication();
  };

  const getIdofSelectedThesis = () => {
    Axios.get(
      `http://localhost:9000/students/getIdOfSelectedThesis/${props.studentID}/${thesisTitle}`
    )
      .then((response) => {
        setThesisSerialNumber(response.data[0].serialNumber);
      })
      .catch((error) => {
        console.log(error);
      });
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
    setPublicationExists(false);
    setIsPublicationLinked(false);
    viewStudentPublications();
    getallThesis();
    getIdofSelectedThesis();
  }, [thesisSerialNumber, thesisTitle, isPublicationAdded]);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 mb-3 mt-3">
          <Button onClick={setModalAddPublication}>
            {" "}
            <AiIcons.AiFillFileAdd></AiIcons.AiFillFileAdd> Add publication
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
                      onClick={() => {
                        onClickButton(item.id);
                      }}
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
      <Modal
        isOpen={modalLinkPublication}
        toggle={setModalLinkPublication}
        centered
      >
        <ModalHeader
          toggle={setModalLinkPublication}
          style={{ backgroundColor: "#081A2D", color: "white" }}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="close link-underline"
              onClick={setModalLinkPublication}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          {" "}
          Link Publication
        </ModalHeader>
        <ModalBody>
          <Form
            model="linkPublicationForm"
            onSubmit={(values) => linkPublication(values)}
          >
            <FormGroup>
              <Label for="exampleSelect">Select Thesis</Label>
              <Control.select
                model=".thesis"
                type="select"
                name="select"
                id="exampleSelect"
                className="form-control"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setThesisTitle(thesis[selectedOption].title);
                }}
              >
                {createSelectItems()}
              </Control.select>
            </FormGroup>
            {isPublicationLinked ? (
              <Alert color="success">Publication Linked Successsfully</Alert>
            ) : isPublicationExists ? (
              <Alert color="danger">Publication Already Linked</Alert>
            ) : null}
            <Input type="submit" className="btn-primary" value="Submit"></Input>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={modalAddPublication}
        toggle={setModalAddPublication}
        centered
      >
        <ModalHeader
          toggle={setModalAddPublication}
          style={{ backgroundColor: "#081A2D", color: "white" }}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="close link-underline"
              onClick={setModalAddPublication}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          {" "}
          Add Publication
        </ModalHeader>
        <ModalBody>
          <Form
            model="addPublicationForm"
            onSubmit={(values) => addPublication(values)}
          >
            <FormGroup>
              <Label for="publicationTitle">Publication title</Label>
              <Control.text
                type="text"
                name="publicationTitle"
                id="publicationTitle"
                placeholder="Enter publication title"
                className="form-control"
                model=".publicationTitle"
              ></Control.text>
            </FormGroup>
            <FormGroup>
              <Label for="host">Host</Label>
              <Control.text
                type="text"
                name="host"
                id="host"
                placeholder="Enter Host Name"
                model=".host"
                className="form-control"
              ></Control.text>
            </FormGroup>
            <FormGroup>
              <Label for="place">Host</Label>
              <Control.text
                type="text"
                name="place"
                id="place"
                placeholder="Enter Place Name"
                className="form-control"
                model=".place"
              ></Control.text>
            </FormGroup>
            <FormGroup>
              <Label for="date">Publication Date</Label>

              <Control.text
                type="date"
                name="date"
                id="date"
                className="form-control"
                model=".date"
              ></Control.text>
            </FormGroup>
            <FormGroup>
              <Label for="publicationLink">Accepted Publication</Label>
              <Control.select
                type="select"
                name="isAccepted"
                id="exampleSelect"
                className="form-control"
                model=".isAccpted"
              >
                {" "}
                <option value="1">0</option>
                <option value="0">1</option>
              </Control.select>
            </FormGroup>
            {isPublicationAdded ? (
              <Alert color="success">Publication Added Successfully</Alert>
            ) : null}

            <Input type="submit" className="btn-primary" value="Submit"></Input>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default Publications;
