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

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/viewStudentPublications/${props.studentID}`
    ).then((res) => {
      setPublications(res.data);
    });
  }, []);
  return (
    <div className="row">
      <Button>
        {" "}
        <AiIcons.AiFillFileAdd></AiIcons.AiFillFileAdd> HI
      </Button>

      {publications.map((item, index) => {
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
  );
}
export default Publications;
