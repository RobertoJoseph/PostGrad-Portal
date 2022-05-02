/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col,
  Input,
  Label,
  FormGroup,
  Row,
  Alert,
} from "reactstrap";
import Axios from "axios";
import "../../css/newNav.css";
import "../../css/Navbar.css";
import { Control, Form } from "react-redux-form";

function Payments(props) {
  const [payments, setPayments] = useState([]);
  const [paymentNumber, setPaymentNumber] = useState(1);
  const [installmentsIssued, setInstallmentsIssued] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [thesis, setThesis] = useState([]);
  const [thesisSerialNumber, setThesisSerialNumber] = useState(
    thesis.length != 0 ? thesis[0].serialNumber : 0
  );
  const [isIssued, setIsIssued] = useState(false);

  const getAllThesis = () => {
    Axios.get("http://localhost:9000/admin/getAllThesis").then((res) => {
      setThesis(res.data);
    });
  };

  const getAllPayments = () => {
    Axios.get("http://localhost:9000/admin/getpayments").then((res) => {
      setPayments(res.data);
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

  const handleSubmit2 = (values) => {
    Axios.post("http://localhost:9000/admin/issueinstallment", {
      paymentNumber: paymentNumber,
      date: values.startDate,
    })
      .then((res) => {
        if (res.data.isIssued) {
          setInstallmentsIssued(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSelectItems = () => {
    let items = [];
    items.push(<option>Select Thesis</option>);

    for (let i = 0; i <= thesis.length; i++) {
      if (thesis[i] == undefined) {
        break;
      }
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

  const createPaymentSelect = () => {
    let items = [];
    items.push(<option>Select Payment Order</option>);
    for (let i = 0; i <= payments.length; i++) {
      if (payments[i] == undefined) {
        break;
      }
      items.push(
        <option key={i} value={i}>
          {payments[i]
            ? "Payment #" +
              payments[i].id +
              ", for Serial #" +
              payments[i].serialNumber
            : null}
        </option>
      );
    }
    return items;
  };

  useEffect(() => {
    getAllThesis();
    getAllPayments();
  }, []);

  useEffect(() => {
    getAllPayments();
    getAllThesis();
  }, [isIssued]);
  useEffect(() => {
    getAllPayments();
  }, [installmentsIssued]);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="row mt-5">
        <Col md={{ size: 10, offset: 1 }}>
          <Nav tabs>
            <NavItem className="tab">
              <NavLink
                id={activeTab === "1" ? "act" : ""}
                onClick={() => setActiveTab("1")}
              >
                Payment Order
              </NavLink>
            </NavItem>
            <NavItem className="tab">
              <NavLink
                id={activeTab === "2" ? "act" : ""}
                onClick={() => setActiveTab("2")}
              >
                Installments
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="content">
            <TabPane tabId="1">
              <div className=" mb-5 container">
                <div>
                  <Row id="data-title" mb={5}>
                    Issue a Payment Order
                  </Row>
                  <Row>
                    <Form
                      model="payment"
                      onSubmit={(values) => handleSubmit(values)}
                    >
                      <FormGroup>
                        <Label for="exampleSelect">Select Thesis</Label>
                        <Control.select
                          type="select"
                          name="thesis"
                          model=".thesis"
                          id="exampleSelect"
                          className="form-control"
                          onChange={(e) => {
                            getAllThesis();
                            const selectedOption = e.target.value;
                            console.log(
                              "HERE IS THE SELECTED OPTION",
                              selectedOption
                            );
                            setThesisSerialNumber(
                              thesis[selectedOption].serialNumber
                            );
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
            </TabPane>
            <TabPane tabId="2">
              <div className=" mb-5 container">
                <div>
                  <Row id="data-title" mb={5}>
                    Issue Installments for a Payment
                  </Row>
                  <Row>
                    <Form
                      model="installments"
                      onSubmit={(values) => handleSubmit2(values)}
                    >
                      <FormGroup>
                        <Label for="paymentsSelect">Select Payment No.</Label>
                        <Control.select
                          type="select"
                          name="payments"
                          model=".payments"
                          id="paymentsSelect"
                          className="form-control"
                          onChange={(e) => {
                            const selectedOption = e.target.value;
                            setPaymentNumber(payments[selectedOption].id);
                          }}
                        >
                          {createPaymentSelect()}
                        </Control.select>
                      </FormGroup>

                      <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Control.text
                          type="date"
                          name="startDate"
                          id="startDate"
                          placeholder="Enter Start Date"
                          className="form-control"
                          model=".startDate"
                        ></Control.text>
                      </FormGroup>

                      {installmentsIssued ? (
                        <Alert color="success">
                          <strong>Success!</strong>
                          Thesis Installments Issued Successfully
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
            </TabPane>
          </TabContent>
        </Col>
      </div>
    </IconContext.Provider>
  );
}

export default Payments;
