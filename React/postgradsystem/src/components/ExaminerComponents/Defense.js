import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import "../../css/newNav.css";
import * as AiIcons from "react-icons/ai";
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
} from "reactstrap";
import "../../css/Navbar.css";
import { Control, Form } from "react-redux-form";

function Defense(props) {
  const [data, setData] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [isModalOpen, setModal] = useState(false);
  const [thesisAndDate, setThesisAndDate] = useState([0, 0, 0]);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [value, setValue] = useState(0);

  const toggleModal = () => {
    setModal(!isModalOpen);
    setAddedSuccess(false);
  };
  const handleSubmit = (values) => {
    console.log("S:" + values.comment);
    Axios.post("http://localhost:9000/examiner/addCommentGrade", {
      serialNumber: thesisAndDate[0],
      comment: values.comment,
      defenseDate: thesisAndDate[1],
      studentID: thesisAndDate[2],
      grade: values.grade,
    })
      .then((response) => {
        if (response.data.isUpdated) {
          setAddedSuccess(true);
        }
      })
      .catch((error) => console.log(error));
    toggleModal();
  };

  const handleMoreInfoButton = (thesisSerialNumber, defenseDate, studentID) => {
    toggleModal();
    setThesisAndDate([thesisSerialNumber, defenseDate, studentID]);
  };

  const search = (rows) => {
    var word = currentWord.toLowerCase();
    return rows.filter((row) => row.Title.toLowerCase().indexOf(word) > -1);
  };

  const getAllDefenses = () => {
    Axios.get(
      `http://localhost:9000/examiner/attenddefense/${props.examinerID}`
    )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllDefenses();
  }, []);
  useEffect(() => {
    getAllDefenses();
  }, [addedSuccess]);

  return (
    <div>
      <div className="col-12 mt-3">
        <label className="label">
          <h3>Search</h3>
        </label>
        <input
          type="text"
          className="form-control"
          value={currentWord}
          placeholder="Search By Thesis Title"
          onChange={(e) => {
            setCurrentWord(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <div className="row">
          {search(data).map((item, index) => {
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
                      {item.Title}
                    </span>
                  </CardHeader>
                  <CardBody id="CardBody" style={{ backgroundColor: "white" }}>
                    <dl className="row p-1">
                      <dt className="col-6">Type</dt>
                      <dd className="col-6">{item.type}</dd>
                      <dt className="col-6">Field</dt>
                      <dd className="col-6">{item.field}</dd>
                      <dt className="col-6">Title</dt>
                      <dd className="col-6">{item.Title}</dd>
                      <dt className="col-6">Defense Date</dt>
                      <dd className="col-6">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date(Date.parse(item.DATE)))}
                      </dd>
                      <dt className="col-6">Student</dt>
                      <dd className="col-6">{item.Student}</dd>
                      <dt className="col-6">Supervisor</dt>
                      <dd className="col-6">{item.Supervisor}</dd>
                      <dt className="col-6">Grade</dt>
                      <dd className="col-6">{item.GRADE}</dd>
                      <dt className="col-6">Comment</dt>
                      <dd className="col-6">{item.COMMENT}</dd>
                    </dl>
                    {/* Compare between two dates if the endDate>=today ==> create Button else null */}
                    {/* --------------- */}
                    <div className="offset-9">
                      <Button
                        onClick={() =>
                          handleMoreInfoButton(
                            item.serialNumber,
                            item.DATE,
                            item.id
                          )
                        }
                      >
                        <AiIcons.AiOutlineInfoCircle size="19px"></AiIcons.AiOutlineInfoCircle>{" "}
                        More Info
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
          <Modal centered isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader
              style={{ backgroundColor: "#081A2D", color: "white" }}
              toggle={toggleModal}
              close={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="close link-underline" onClick={toggleModal}>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </a>
              }
            >
              Add Progress Report
            </ModalHeader>
            <ModalBody>
              <Form
                model="moreInfoForm"
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.text
                    type="text"
                    id="comment"
                    model=".comment"
                    name="comment"
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
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

                <input
                  type="submit"
                  value="Submit"
                  className="form-control btn-primary"
                />
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Defense;
