import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons';
import { Col, Table, Badge } from 'reactstrap';
import Axios from "axios";
import "../../css/newNav.css";
import "../../css/Navbar.css";



function GUCpayments(props) {

  const [thesisPayment, setThesisPayment] = useState([]);


  const getThesisPayments = () => {
    Axios.get(`http://localhost:9000/students/thesispayments/${props.studentID}`).then(
      (res) => {
        setThesisPayment(res.data);
      }
    );
  };


  useEffect(() => {
    getThesisPayments();
  }, []);


  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='row mt-5'>
        <Col md={{ size: 10, offset: 1 }} >


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
                        <th scope="row">{index + 1}</th>
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


        </Col>
      </div>

    </IconContext.Provider>

  );

}

export default GUCpayments;