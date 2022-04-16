import React from "react";
import { useEffect, useState } from "react";
import "../../css/Admin.css";
import Axios from "axios";
import { Button, Table } from "reactstrap";

function SupervisorTheses(props) {
  const [supervisor, setSupervisor] = useState([]);


  useEffect(() => {
    Axios.get(
      `http://localhost:9000/admin/listsuptheses/${props.supervisorID}`
    ).then((res) => {
      setSupervisor(res.data);
    });
  }, []);

  return (
    <div className="col-12 mt-3">
      <Table striped>
        
        <thead id="thead">
                <th></th>
                <th>Supervisor's currently supervising students</th>
                <th></th>
        </thead>


        <tbody>
          {supervisor.map((item, index) => {
            return (
              
              <tr key={index} align="center">
                <td>{"Student ID." + item.studentID}</td>
                <td>{item.First_name + " " + item.Last_name }</td>
                <td>{item.Thesis}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default SupervisorTheses;
