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
} from "reactstrap";
import * as IoIcons from "react-icons/io";
import * as TiIcons from "react-icons/ti";

function Thesis(props) {
  const [thesis, setThesis] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  let selectedThesis = 0;
  const onClickButton = (serialNumber) => {
    selectedThesis = serialNumber;
    setModalOpen(!isModalOpen);
  };
  const addProgressReport = (serialNumber) => {
    Axios.post("http://localhost:9000/students/addprogressreport", {
      serialNumber: serialNumber,
    })
      .then((response) => {
        console.log(response);
        alert("Progress Report Added");
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
          <div key={index} className="col-6 mt-3">
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
    </div>
  );
}
export default Thesis;
