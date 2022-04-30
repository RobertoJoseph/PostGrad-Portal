import React from "react";
import "../../css/newNav.css";
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
} from "reactstrap";
import * as AiIcons from "react-icons/ai";
import { Control, Form } from "react-redux-form";
import { useEffect, useState } from "react";
import Axios from "axios";
function Installemnts() {
  const [thesis, setThesis] = useState([]);
  const [thesisSerialNumber, setThesisSerialNumber] = useState(1);
  const [isIssued, setIsIssued] = useState(false);

  const getAllThesis = () => {
    Axios.get("http://localhost:9000/admin/getAllThesis").then((res) => {
      setThesis(res.data);
    });
  };

  const handleSubmit = (values) => {
    Axios.post("http://localhost:9000/admin/addInstallment", {
      thesisSerialNumber: thesisSerialNumber,
      amount: values.amount,
      installment: values.installment,
      fund: values.fund,
    })
      .then((res) => {
        if (res.data.isIssued) {
          setIsIssued(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const mappingThesis = () => {
  //     let temp = [];
  //     for (let i = 1; i <= thesis.length; i++) {
  //       temp.push({
  //         serialNumber: thesis[i].serialNumber,
  //         title: thesis[i].title,
  //       });
  //     }
  //     return temp;
  //   };

  const createSelectItems = () => {
    let items = [];
    for (let i = 0; i <= thesis.length; i++) {
      items.push(
        <option key={i} value={i}>
          {thesis[i]
            ? "#" + thesis[i].serialNumber + " " + thesis[i].title
            : null}
        </option>
      );
    }
    return items;
  };

  useEffect(() => {
    getAllThesis();
  }, []);

  return (
    <div className="mt-5 mb-5 container">
      <div>
        <Row id="data-title" mb={5}>
          Issue Thesis Payment
        </Row>
        <Row>
          <Form model="payment" onSubmit={(values) => handleSubmit(values)}>
            <FormGroup>
              <Label for="exampleSelect">Select Thesis</Label>
              <Control.select
                type="select"
                name="thesis"
                model=".thesis"
                id="exampleSelect"
                className="form-control"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setThesisSerialNumber(thesis[selectedOption].serialNumber);
                }}
              >
                {createSelectItems()}
              </Control.select>
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Control.text
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter Amount"
                className="form-control"
                model=".amount"
              ></Control.text>
            </FormGroup>
            <FormGroup>
              <Label for="installments">No. Of Installemnts</Label>
              <Control.select
                type="select"
                name="installments"
                id="installments"
                placeholder="Number of Installments"
                className="form-control"
                model=".installment"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Control.select>
            </FormGroup>

            <FormGroup>
              <Label for="fund">Fund Precentage</Label>
              <Control.text
                type="number"
                name="fund"
                id="fund"
                placeholder="Enter Fund Precentage"
                className="form-control"
                model=".fund"
              ></Control.text>
            </FormGroup>
            {isIssued ? (
              <Alert color="success">
                <strong>Success!</strong>
                Thesis Payment Issued Successfully
              </Alert>
            ) : null}

            <div className="mt-5">
              <Row>
                <Col>
                  <Input
                    type="submit"
                    className="btn-primary"
                    value="Submit"
                  ></Input>
                </Col>
              </Row>
            </div>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default Installemnts;
