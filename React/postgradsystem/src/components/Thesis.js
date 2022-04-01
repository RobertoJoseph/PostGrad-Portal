import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import StudentNavbar from "./StudentNavbar";
import Axios from "axios";
import { Card, CardTitle, CardText } from "reactstrap";

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
    <div>
      {thesis.map((item, index) => {
        return (
          <div key={index} >
            <div class="card">
              <h3 class="card-header bg-primary text-white">{item.field}</h3>
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <p class="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Thesis;
