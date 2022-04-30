import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Row,
  Col,
  Table,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import * as AiIcons from "react-icons/ai";
import { Control, Form } from "react-redux-form";
import Axios from "axios";
import "../../css/newNav.css";

function Defense() {
  const [defenses, setDefenses] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const getAllDefenses = () => {
    Axios.get("http://localhost:9000/admin/viewExamSupDefense").then((res) => {
      setDefenses(res.data);
    });
  };

  useEffect(() => {
    getAllDefenses();
  }, []);

  const search = (rows) => {
    let date = currentDate;
    if (date == null || undefined || date == "") {
      return rows;
    } else {
      return rows.filter(
        (row) => new Date(row.date).getTime() === new Date(date).getTime()
      );
    }
  };

  return (
    <div>
      <div className="col-12 mt-3">
        <div>
          <label className="label">
            <h3 style={{ fontWeight: "bold" }}>Search Defense By Date</h3>
          </label>

          <input
            type="date"
            className="form-control"
            placeholder="Select Defense Date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
          ></input>
        </div>
        <br></br>

        <hr></hr>
        <Table hover size="md" striped>
          <thead>
            <tr>
              <th>#</th>
              <th>{"          "}Examiner Name</th>
              <th>{"          "}Supervisor Name</th>
              <th>{"          "}Defense Date</th>
            </tr>
          </thead>
          <tbody>
            {search(defenses).map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(item.date)))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default Defense;
