import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import Axios from "axios";
import { Card, CardTitle, CardText } from "reactstrap";

function Courses(props) {
  const [courses, setCourse] = useState([]);
  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/studentcourses/${props.studentID}`
    ).then((res) => {
      setCourse(res.data);
    });
  }, []);

  return (
    <div>
      {courses.map((item, index) => {
        return (
          <div key={index}>
            <div class="card">
              <h3 class="card-header bg-primary text-white"></h3>
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Courses;
