import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons';
import {
    Nav, NavItem, NavLink, TabContent, TabPane, Col, Table, Badge, Button
} from 'reactstrap';
import Axios from "axios";
import "../../css/newNav.css";
import "../../css/Navbar.css";



function Students(props) {

    const [gucians, setGucians] = useState([]);
    const [nonGucians, setNonGucians] = useState([]);
    const [activeTab, setActiveTab] = useState('1');

    const onClickButton = (studentID) => {
        props.func(studentID);
      };

    const viewAllGUCians = () => {
        Axios.get(`http://localhost:9000/admin/allgucians/`).then(
            (res) => {
                setGucians(res.data);
            }
        );
    };

    const viewAllNonGUCians = () => {
        Axios.get(`http://localhost:9000/admin/allnongucians/`).then(
            (res) => {
                setNonGucians(res.data);
            }
        );
    };

    useEffect(() => {
        viewAllGUCians();
        viewAllNonGUCians();
    }, []);


    return (
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='row mt-5'>
                <Col md={{ size: 10, offset: 1 }} >

                    <Nav tabs>
                        <NavItem className='tab'>
                            <NavLink id={activeTab === '1' ? 'act' : ''} onClick={() => setActiveTab('1')}>
                                GUCians
                            </NavLink>
                        </NavItem>
                        <NavItem className='tab'>
                            <NavLink id={activeTab === '2' ? 'act' : ''} onClick={() => setActiveTab('2')}>
                                Non-GUCians
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} className='content'>
                        <TabPane tabId="1">
                            <Table striped>
                                <thead>
                                    <tr align="center">
                                        <th>Student ID.</th>
                                        <th>Full Name</th>
                                        <th>Student Profile</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {gucians.map((item, index) => {
                                        return (
                                            <tr key={index} align="center">
                                                <th scope="row">{item.id}</th>
                                                <td>{item.firstName + " " + item.lastName}</td>
                                                <td><Button onClick={() => {onClickButton(item.id)}}>View Profile</Button></td>
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
                                        <th>Student ID.</th>
                                        <th>Full Name</th>
                                        <th>Student Profile</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {nonGucians.map((item, index) => {
                                        return (
                                            <tr key={index} align="center">
                                                <th scope="row">{item.id}</th>
                                                <td>{item.firstName + " " + item.lastName}</td>
                                                <td><Button onClick={() => {onClickButton(item.id)}}>View Profile</Button></td>
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

export default Students;