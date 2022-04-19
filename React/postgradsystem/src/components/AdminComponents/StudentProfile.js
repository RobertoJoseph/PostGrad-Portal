import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import {
    Label,
    Row,
    Col,
    FormGroup,
    Input,
    Table
} from "reactstrap";
import Axios from "axios";
import "../../css/newNav.css";

function StudentProfile(props) {
    const [data, setData] = useState([]);
    const [isGUCian, setIsGUCian] = useState(false);
    const [courses, setCourse] = useState([]);

    const getCourses = () => {
        Axios.get(
            `http://localhost:9000/students/studentcourses/${props.studentID}`
        ).then((res) => {
            setCourse(res.data);
        });
    }


    const checkGUCian = () => {
        Axios.post(`http://localhost:9000/students/isGUCian/${props.studentID}`, {}).then(
            (res) => {
                if (res.data.isGUCian) {
                    setIsGUCian(true);
                }
            }
        );
    };

    useEffect(() => {
        Axios.get(
            `http://localhost:9000/students/studentdata/${props.studentID}`
        ).then((res) => {
            setData(res.data);
        });
        checkGUCian();
        getCourses();
    }, []);

    return (
        <IconContext.Provider value={{ color: "#fff" }}>
            <div>
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="mt-5 mb-5 container">
                                <div>
                                    <Row id="data-title" mb={5}>
                                        Personal Information
                                    </Row>
                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="firstName" md={{ size: 2 }}>
                                                First Name
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    value={item.firstName}
                                                ></Input>
                                            </Col>
                                            <Label htmlFor="lastName" md={{ offset: 1, size: 2 }}>
                                                Last Name
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    value={item.lastName}
                                                ></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="email" md={{ size: 2 }}>
                                                Email
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={item.email}
                                                ></Input>
                                            </Col>
                                            <Label htmlFor="address" md={{ offset: 1, size: 2 }}>
                                                Address
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    rows="3"
                                                    value={item.address}
                                                ></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="faculty" md={{ size: 2 }}>
                                                Faculty
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="faculty"
                                                    name="faculty"
                                                    type="text"
                                                    value={item.faculty}
                                                ></Input>
                                            </Col>

                                            <Label htmlFor="gpa" md={{ offset: 1, size: 2 }}>
                                                GPA
                                            </Label>
                                            <Col md={3}>
                                                <Input
                                                    id="gpa"
                                                    name="gpa"
                                                    type="text"
                                                    value={item.GPA}
                                                ></Input>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </div>

                            </div>

                        </div>
                    );
                })
                }
                {
                    (!isGUCian) ? (
                        <div className="mt-5 mb-5 container">
                            <div>
                                <Row id="data-title" mb={5}>
                                    Enrolled Courses
                                </Row>
                                <div className="col-12 mt-3">
                                    <Table striped>
                                        <thead>
                                            <tr align="center">
                                                <th>#</th>
                                                <th>Course Name</th>
                                                <th>Credit hours</th>
                                                <th>Fees</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {courses.map((item, index) => {
                                                return (
                                                    <tr key={index} align="center">
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.code}</td>
                                                        <td>{item.creditHours}</td>
                                                        <td>{item.fees}</td>
                                                        <td>{item.grade}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>) : null
                }

            </div>
        </IconContext.Provider>
    );
}
export default StudentProfile;
