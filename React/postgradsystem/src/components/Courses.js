import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import "../css/newNav.css";
import Axios from "axios";
import { Card, CardTitle, CardText, Table } from "reactstrap";

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
    <div className="col-12 mt-3">
      <Table striped>
        <thead>
          <tr align="center">
            <th>#</th>
            <th>Course Name</th>
            <th>Credit hours</th>
            <th>Fees</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((item, index) => {
            return (
              <tr key={index} align="center">
                <th scope="row">{index + 1}</th>
                <td>{item.code}</td>
                <td>{item.creditHours}</td>
                <td>{item.fees}</td>
                <td>{item.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default Courses;
