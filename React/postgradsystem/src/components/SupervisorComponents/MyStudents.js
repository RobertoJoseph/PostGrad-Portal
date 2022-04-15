import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import { Card, CardTitle, CardText, Table } from "reactstrap";
import styled from "styled-components";


function MyStudents(props) {
  const [students, setStudents] = useState([]);
  
  const Button = styled.button`
    background-color: #243b55;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: #243b55;
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;
  
  
  function clickMe() {
    alert("You clicked me!");
  }
  const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/supervisor/mystudents/${props.studentId}`
    ).then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div className="col-12 mt-3">
      <Table striped style={{backgroundColor:'white',height:'300px'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Thesis Title</th>
            <th>Years</th>
            <th>Publications</th>
          </tr>
        </thead>

        <tbody>
          {students.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item.StudentFirstName+" "+item.StudentLastName}</td>
                <td>{item.ThesisTitle}</td>
                <td>{item.Years}</td>
                <td><Button onClick={clickMe}>View</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default MyStudents;
