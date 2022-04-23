import React from "react";
import { useEffect, useState } from "react";
import "../../css/Admin.css";
import Axios from "axios";
import { Table } from "reactstrap";

function EnrolledStudents(props) {
    const [students, setStudents] = useState([]);


    useEffect(() => {
        Axios.get(
            `http://localhost:9000/admin/enrolledstudents/${props.courseID}`
        ).then((res) => {
            setStudents(res.data);
        });
    }, []);

    return (
        <div className="col-10 mt-3 offset-1">
            <Table striped>

                <thead id="thead">
                    <th></th>
                    <th>Students Enrolled in {props.courseName}</th>
                    <th></th>
                </thead>
                <thead>
                    <tr align="center">
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>


                <tbody>
                    {students.map((item, index) => {
                        return (

                            <tr key={index} align="center">
                                <th scope="row">{"#" + item.id}</th>
                                <td>{item.firstName + " " + item.lastName}</td>
                                <td>{item.grade + "%"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default EnrolledStudents;
