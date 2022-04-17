import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
import "../../css/Navbar.css";
import * as AiIcons from "react-icons/ai";

function DataTable({ data }) {
  console.log(data);
  return (
    <div className="row">
      {data.map((item, index) => {
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
                  <Button>
                    <AiIcons.AiOutlineInfoCircle size="19px"></AiIcons.AiOutlineInfoCircle>{" "}
                    More Info
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
export default DataTable;
