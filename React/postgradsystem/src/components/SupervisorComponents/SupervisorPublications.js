import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import { Card, CardTitle, CardText, Table } from "reactstrap";
import styled from "styled-components";
import { useParams } from "react-router-dom";



function SupervisorPublications(props) {
  const [publications, setPublications] = useState([]);
  let { studentId } = useParams();

  
  useEffect(() => {
    Axios.get(
      `http://localhost:9000/supervisor/publications/${studentId}`
    ).then((res) => {
      setPublications(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="col-12 mt-3">
      <Table striped style={{backgroundColor:'white',height:'300px'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Place</th>
            <th>State</th>
            <th>Host</th>
          </tr>
        </thead>

        <tbody>
          {publications.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.place}</td>
                <td>{item.isAccepted=0?"Not Accepted":"Accepted"}</td>
                <td>{item.host}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default SupervisorPublications;
