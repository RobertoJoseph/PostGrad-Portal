import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import "../../css/newNav.css";
import Axios from "axios";
import { Table } from "reactstrap";

function Reports(props) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/studentProgressReports/${props.studentID}`, {
        
      }
    ).then((res) => {
      setReports(res.data);
    });
  }, []);

  return (
    <div>
          <div className="col-12 mt-3">
      <Table striped>
        <thead>
          <tr align="center" className="tableHeader">
            <th>#</th>
            <th>Thesis Title</th>
            <th >Evaluation</th>
            <th>Supervisor</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item, index) => {
            return (
              <tr key={index} align="center">
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.evaluation}</td>
                <td>{item.firstName + " " + item.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    </div>
  );
}
export default Reports;
