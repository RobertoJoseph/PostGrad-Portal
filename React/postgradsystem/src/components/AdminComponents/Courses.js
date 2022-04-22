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
    Form
} from "reactstrap";
import * as AiIcons from "react-icons/ai";
import { useForm } from "react-hook-form";




function Courses(props) {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, toggleModal] = useState(false);
    const [courseAdded, setCourseAdded] = useState(false);
    const setTheModal = () => {
        toggleModal(!isModalOpen);
        setCourseAdded(false);
    };
    const { register, handleSubmit } = useForm();

    const allCourses = () => {
        Axios.get(
            `http://localhost:9000/admin/courses/`
        ).then((res) => {
            setCourses(res.data);
        });
    }

    const addCourse = (values) => {
        Axios.post("http://localhost:9000/admin/addcourse", {
            courseName: values.name,
            creditHours: values.credit,
            fees: values.fees,
        })
            .then((response) => {
                console.log("The response is amazing");
                setCourseAdded(true);

            })
            .catch((error) => {
                console.log(error);
            });
    };



    useEffect(() => {
        allCourses();
    }, [courseAdded]);
    return (
        <div>
            <div className="row">
                <div className="col-md-12 mb-3 mt-3">
                    <Button onClick={setTheModal}>
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
            <Modal centered isOpen={isModalOpen} toggle={setTheModal}>
                <ModalHeader
                    style={{ backgroundColor: "#081A2D", color: "white" }}
                    toggle={setTheModal}
                    close={
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a className="close link-underline" onClick={setTheModal}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                    }
                >
                    Add New Course
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(addCourse)}>
                        <FormGroup>
                            <Label htmlFor="name">Course Name</Label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                ref={register}
                                className="form-control"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="credit">Credit Hours</Label>
                            <select
                                id="credit"
                                name="credit"
                                type="select"
                                ref={register}
                                className="form-control"

                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="fees">Course Fees</Label>
                            <input
                                type="number"
                                id="fees"
                                name="fees"
                                ref={register}
                                className="form-control"
                            />
                        </FormGroup>
                        {courseAdded ? (
                            <p style={{ color: "green" }}>
                                {" "}
                                <AiIcons.AiFillCheckCircle></AiIcons.AiFillCheckCircle>
                                Course Added Successfully
                            </p>
                        ) : null}
                        <input
                            type="submit"
                            value="Save"
                            className="form-control btn-primary"
                        />
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}
export default Courses;
