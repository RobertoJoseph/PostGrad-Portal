import React from "react";
import { useEffect, useState } from "react";
import "../../css/Admin.css";
import Axios from "axios";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";

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
  Table,
} from "reactstrap";

function ListTheses(props) {
  const [theses, setTheses] = useState([]); // all theses
  const [selectedSerial, setSelectedSerial] = useState(0); //Id of the selected thesis
  const [isClicked, setIsClicked] = useState(0); // to check if the button is clicked
  const [isClicked2, setIsClicked2] = useState(0);
  const [publications, setPublications] = useState([]);
  const [acceptedPublications, toggleAcceptedPublications] = useState(false);
  const setModalAcceptedPublications = () => {
    toggleAcceptedPublications(!acceptedPublications);
  };

  const incrementExtensionButton = (serialNumber) => {
    setIsClicked(!isClicked);
    setSelectedSerial(serialNumber);
  };
  const viewPublicationButton = (serialNumber) => {
    setIsClicked2(!isClicked2);
    toggleAcceptedPublications(!acceptedPublications);
    setSelectedSerial(serialNumber);
  };

  const getPulications = () => {
    Axios.get(
      `http://localhost:9000/admin/getAcceptedPublication/${selectedSerial}`
    )
      .then((res) => {
        setPublications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const incrementExtension = () => {
    Axios.post(
      `http://localhost:9000/admin/incrementExtension/${selectedSerial}`
    )
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    listTheses();
  };

  const listTheses = () => {
    Axios.get(`http://localhost:9000/admin/listtheses/`).then((res) => {
      setTheses(res.data);
    });
  };
  useEffect(() => {
    listTheses();
  }, []);

  useEffect(() => {
    incrementExtension();
  }, [isClicked]);
  useEffect(() => {
    getPulications();
  }, [isClicked2]);

  return (
    <div className="row">
      {theses.map((item, index) => {
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
                  Thesis&nbsp;Serial No. {item.serialNumber}&nbsp; :&nbsp;&nbsp;{" "}
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
                  <dt className="col-6">No. of Extensions</dt>
                  <dd className="col-6">{item.noExtension}</dd>
                </dl>
                <Button
                  onClick={() => {
                    incrementExtensionButton(item.serialNumber);
                  }}
                >
                  <HiIcons.HiPlusCircle size="18px"></HiIcons.HiPlusCircle>
                  {"  "}
                  Increment Extensions
                </Button>
                <span></span>
                <Button
                  onClick={() => {
                    viewPublicationButton(item.serialNumber);
                  }}
                >
                  <AiIcons.AiFillEye size="18px"></AiIcons.AiFillEye>
                  {"  "}
                  View Publications
                </Button>
              </CardBody>
            </Card>
          </div>
        );
      })}

      <Modal
        isOpen={acceptedPublications}
        toggle={setModalAcceptedPublications}
        centered
      >
        <ModalHeader
          toggle={setModalAcceptedPublications}
          style={{ backgroundColor: "#081A2D", color: "white" }}
          close={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="close link-underline"
              onClick={setModalAcceptedPublications}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          }
        >
          {" "}
          Accepted Publications
        </ModalHeader>
        <ModalBody>
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Place</th>
                <th>Host</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.place}</td>
                    <td>{item.host}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ListTheses;
