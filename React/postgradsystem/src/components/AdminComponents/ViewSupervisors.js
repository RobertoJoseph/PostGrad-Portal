import React from "react";
import { useEffect, useState } from "react";
import "../../css/Admin.css";
import Axios from "axios";
import { Button, Table } from "reactstrap";

function ListSupervisors(props) {
  const [supervisors, setSupervisors] = useState([]);

  const onClickButton = (supervisorID) => {
    props.func(supervisorID);
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/admin/listsupervisors/`
    ).then((res) => {
      setSupervisors(res.data);
    });
  }, []);

  return (
    <div className="col-12 mt-3">
      <Table striped>
      <thead id="thead2">
                <th></th>
                <th>View All Supervisors</th>
                <th></th>
                <th></th>
        </thead>
        <tbody>
          {supervisors.map((item, index) => {
            return (
              <tr key={index} align="center">
                <th scope="row">{"#" + item.id}</th>
                <td>{item.firstName + " " + item.lastName }</td>
                <td>{item.faculty}</td>
                <td><Button onClick={() => {onClickButton(item.id)}}>View Details</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default ListSupervisors;
