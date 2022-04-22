/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useEffect, useState } from "react";
import "../../css/Navbar.css";
import Axios from "axios";
import {
    Table,
    Button,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
} from "reactstrap";
import * as AiIcons from "react-icons/ai";
import { Control, Form } from "react-redux-form";




function Courses(props) {
    const [courses, setCourses] = useState([]);

    const allCourses = () => {
        Axios.get(
            `http://localhost:9000/admin/courses/`
        ).then((res) => {
            setCourses(res.data);
        });
    }



    useEffect(() => {
        allCourses();
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-md-12 mb-3 mt-3">
                    <Button >
                        {" "}
                        <AiIcons.AiFillFileAdd></AiIcons.AiFillFileAdd> Add New Course
                    </Button>
                </div>
                <div className="col-12 mt-3">
                    <Table striped>
                        <thead>
                            <tr align="center">
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Credit hours</th>
                                <th>Fees</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.map((item, index) => {
                                return (
                                    <tr key={index} align="center">
                                        <th scope="row">{item.id}</th>
                                        <td>{item.code}</td>
                                        <td>{item.creditHours}</td>
                                        <td>{item.fees}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
export default Courses;
