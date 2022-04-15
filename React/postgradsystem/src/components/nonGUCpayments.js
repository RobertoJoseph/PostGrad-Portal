import React, { useState, useEffect } from 'react'

import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
import * as AiIcons from "react-icons/ai";
import {
  Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Table, Badge
} from 'reactstrap';
import Axios from "axios";
import "../css/newNav.css";
import { IoMdTennisball } from 'react-icons/io';
import { MdNoEncryption } from 'react-icons/md';

function NonGUCpayments(props) {

  const [thesisPayment, setThesisPayment] = useState([]);
  const [coursePayment, setCoursePayment] = useState([]);
  const [activeTab, setActiveTab] = useState('1');

  const getThesisPayments = () => {
    Axios.get(`http://localhost:9000/students/thesispayments/${props.studentID}`).then(
      (res) => {
        setThesisPayment(res.data);
      }
    );
  };

  const getCoursePayments = () => {
    Axios.get(`http://localhost:9000/students/coursepayments/${props.studentID}`).then(
      (res) => {
        setCoursePayment(res.data);
      }
    );
  };

  useEffect(() => {
    getThesisPayments();
    getCoursePayments();
  }, []);


  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='row mt-5'>
        <Col md={{ size: 10, offset: 1 }} >

          <Nav tabs>
            <NavItem className='tab'>
              <NavLink id={activeTab === '1' ? 'act' : ''} onClick={() => setActiveTab('1')}>
                Theses Payments
              </NavLink>
            </NavItem>
            <NavItem className='tab'>
              <NavLink id={activeTab === '2' ? 'act' : ''} onClick={() => setActiveTab('2')}>
                Courses Payments
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className='content'>
            <TabPane tabId="1">
              <Table striped>
                <thead>
                  <tr align="center">
                    <th>Intsallment No.</th>
                    <th>Thesis Title</th>
                    <th>Deadline</th>
                    <th>Installment Fees</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {thesisPayment.map((item, index) => {
                    return (
                      <tr key={index} align="center">
                        <th scope="row">{index}</th>
                        <td>{item.title}</td>
                        <td>  {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date(Date.parse(item.date)))}</td>
                        <td>{item.amount}</td>
                        <td>
                          {item.isPaid ? (<Badge color='success'>Paid</Badge>) :
                            (new Date(item.date).getTime() >= new Date().getTime() ? (<Badge color='primary'>Upcoming</Badge>) : <Badge color='danger'>Missed</Badge>)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId="2">
            <Table striped>
                <thead>
                  <tr align="center">
                    <th>Intsallment No.</th>
                    <th>Course Name</th>
                    <th>Deadline</th>
                    <th>Installment Fees</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {coursePayment.map((item, index) => {
                    return (
                      <tr key={index} align="center">
                        <th scope="row">{index + 1}</th>
                        <td>{item.code}</td>
                        <td>  {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date(Date.parse(item.date)))}</td>
                        <td>{item.amount}</td>
                        <td>
                          {item.isPaid ? (<Badge color='success'>Paid</Badge>) :
                            (new Date(item.date).getTime() >= new Date().getTime() ? (<Badge color='primary'>Upcoming</Badge>) : <Badge color='danger'>Missed</Badge>)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </TabPane>
          </TabContent>
        </Col>
      </div>

    </IconContext.Provider>

  );

}

export default NonGUCpayments;