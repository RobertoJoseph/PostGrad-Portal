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
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  Row,
  Col,
} from "reactstrap";
import * as MdIcons from "react-icons/md";
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
    Axios.get(`http://localhost:9000/admin/courses/`).then((res) => {
      setCourses(res.data);
    });
  };

  const addCourse = (values) => {
    console.log(values);
    Axios.post("http://localhost:9000/admin/addcourse", {
      courseName: values.name,
      creditHours: values.credit,
      fees: values.fees,
    })
      .then((response) => {
        setCourseAdded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickButton = (courseID, courseName) => {
    props.func(courseID, courseName);
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
            <MdIcons.MdPostAdd></MdIcons.MdPostAdd> Add New Course
          </Button>
        </div>
        <div className="col-10 mt-3 offset-1">
          <Table className="tableHeader" striped>
            <thead className="tableHeader">
              <tr className="tableHeader" align="center">
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Credit hours</th>
                <th>Fees</th>
                <th>Enrolled Students</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, index) => {
                return (
                  <tr key={index} align="center">
                    <th scope="row">{"#" + item.id}</th>
                    <td>{item.code}</td>
                    <td>{item.creditHours}</td>
                    <td>{"$" + "" + item.fees}</td>
                    <td>
                      <Button
                        color="success"
                        onClick={() => onClickButton(item.id, item.code)}
                      >
                        Enrolled Students
                      </Button>
                    </td>
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
              <Row>
                <Label htmlFor="name" className="col-3">
                  Course Name
                </Label>
                <Col md={9}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={register}
                    className="form-control"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label htmlFor="credit" className="col-3">
                  Credit Hours
                </Label>
                <Col md={9}>
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
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label htmlFor="fees" className="col-3">
                  Course Fees
                </Label>
                <Col md={9}>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    ref={register}
                    className="form-control"
                  />
                </Col>
              </Row>
            </FormGroup>
            {courseAdded ? (
              <Alert color="success">Course Added Successfully</Alert>
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
