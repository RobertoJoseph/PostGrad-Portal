import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import Axios from "axios";
import { Card, CardTitle, CardText, CardBody, CardHeader, Row } from "reactstrap";

function Thesis(props) {
  const [thesis, setThesis] = useState([]);
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
              <Card id="Card">
                <CardHeader id ="CardHeader" className=" text-white">Thesis &nbsp;&nbsp;No. {index + 1}&nbsp; :&nbsp;&nbsp; {item.title}</CardHeader>
                <CardBody id="CardBody" className=" text-white">
                  <dl className="row p-1">
                    <dt className="col-6">Type</dt>
                    <dd className="col-6">{item.type}</dd>
                    <dt className="col-6">Field</dt>
                    <dd className="col-6">{item.field}</dd>
                    <dt className="col-6">Start Date</dt>
                    <dd className="col-6">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(item.startDate)))}</dd>
                    <dt className="col-6">End Date</dt>
                    <dd className="col-6">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(item.endDate)))}</dd>
                    <dt className="col-6">Grade</dt>
                    <dd className="col-6">{item.grade}</dd>
                    <dt className="col-6">Defense Date</dt>
                    <dd className="col-6">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(item.defenseDate)))}</dd>
                  </dl>
                </CardBody>
              </Card>

            </div>
          
        );
      })}
    </div>
  );
}
export default Thesis;
