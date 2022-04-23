import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import {
  Label,
  Row,
  Col,
  FormGroup,
  Input,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Alert,
} from "reactstrap";
import Axios from "axios";
import "../../css/newNav.css";
import { useForm } from "react-hook-form";

function StudentProfile(props) {
  const [data, setData] = useState([]);
  const [isGUCian, setIsGUCian] = useState(false);
  const [courses, setCourse] = useState([]);
  const [courseCatalog, setCourseCatalog] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);
  const [courseLinked, setCourseLinked] = useState(false);
  const [gradeAdded, setGradeAdded] = useState(false);
  const { register, handleSubmit } = useForm();
  const [isGradeModalOpen, toggleGradeModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const setTheModal = () => {
    toggleModal(!isModalOpen);
    setCourseLinked(false);
  };
  const setTheGradeModal = () => {
    toggleGradeModal(!isGradeModalOpen);
    setGradeAdded(false);
  };

  const addGradeButton = (courseID) => {
    setTheGradeModal();
    setSelectedCourse(courseID);
  };

  const addGrade = (values) => {
    Axios.post("http://localhost:9000/admin/addgrade/", {
      courseID: selectedCourse,
      studentID: props.studentID,
      grade: values.grade,
    })
      .then((response) => {
        if (response.data.gradeAdded) {
          setGradeAdded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const linkCourse = (values) => {
    console.log("Course Name: " + values.course);
    Axios.post("http://localhost:9000/admin/linkcourse/", {
      courseName: values.course,
      studentID: props.studentID,
    })
      .then((response) => {
        setCourseLinked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCourses = () => {
    Axios.get(
      `http://localhost:9000/students/studentcourses/${props.studentID}`
    ).then((res) => {
      setCourse(res.data);
    });
  };

  const allCourses = () => {
    Axios.get(`http://localhost:9000/admin/courses/`).then((res) => {
      setCourseCatalog(res.data);
    });
  };

  const checkGUCian = () => {
    Axios.post(
      `http://localhost:9000/students/isGUCian/${props.studentID}`,
      {}
    ).then((res) => {
      if (res.data.isGUCian) {
        setIsGUCian(true);
      }
    });
  };

  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/studentdata/${props.studentID}`
    ).then((res) => {
      setData(res.data);
    });
    checkGUCian();
    allCourses();
  }, []);

  useEffect(() => {
    getCourses();
  }, [courseLinked, gradeAdded]);

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
        })}
        {!isGUCian ? (
          <div className="mt-5 mb-5 container">
            <div>
              <Row id="data-title" mb={5}>
                Enrolled Courses
              </Row>
              <div className="col-12 mt-3">
                <Table striped>
                  <thead>
                    <tr align="center">
                      <th>Course ID</th>
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
                          <th scope="row">{"#" + item.id}</th>
                          <td>{item.code}</td>
                          <td>{item.creditHours}</td>
                          <td>{item.fees}</td>
                          <td>
                            {item.grade ? (
                              item.grade+"%"
                            ) : (
                              <Button
                                color="success"
                                onClick={() => addGradeButton(item.id)}
                              >
                                Add Grade
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div className="mt-5">
                  <Row>
                    <Col md={{ offset: 10, size: 2 }}>
                      <Button onClick={setTheModal}>Add Course</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
            Add Course
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(linkCourse)}>
              <FormGroup>
                <Row>
                  <Label htmlFor="course" className="col-3">
                    Select Course
                  </Label>
                  <Col md={9}>
                    <select
                      id="course"
                      name="course"
                      type="select"
                      ref={register}
                      className="form-control"
                    >
                      {courseCatalog.map((item, index) => {
                        return <option>{item.code}</option>;
                      })}
                    </select>
                  </Col>
                </Row>
              </FormGroup>

              {courseLinked ? (
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
        <Modal centered isOpen={isGradeModalOpen} toggle={setTheGradeModal}>
          <ModalHeader
            style={{ backgroundColor: "#081A2D", color: "white" }}
            toggle={setTheGradeModal}
            close={
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className="close link-underline"
                onClick={setTheGradeModal}
              >
                <i class="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          >
            Add Grade
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(addGrade)}>
              <FormGroup>
                <Row>
                  <Label htmlFor="grade" className="col-3">
                    Grade
                  </Label>
                  <Col md={9}>
                    <input
                      id="grade"
                      name="grade"
                      type="number"
                      ref={register}
                      className="form-control"
                    />
                  </Col>
                </Row>
              </FormGroup>

              {gradeAdded ? (
                <Alert color="success">Grade Added Successfully</Alert>
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
    </IconContext.Provider>
  );
}
export default StudentProfile;
