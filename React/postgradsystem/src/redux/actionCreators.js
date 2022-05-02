import Axios from "axios";

export const getStudents = () => async (dispatch) => {
  return Axios.get("http://localhost:9000/students")
    .then((response) => {
      //response.data.haga takecare
      console.log(response.data);
      dispatch(showStudents(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const showStudents = (students) => ({
  type: "SHOW_STUDENTS",
  payload: students,
});

export const addStudent =
  (firstName, lastName, email, password, faculty, address, isGucian) =>
  (dispatch) => {
    console.log("HAHAHAHahh in the action");
    const newStudent = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      faculty: faculty,
      address: address,
      isGucian: isGucian,
    };
    return Axios.post("http://localhost:9000/students/addStudent", newStudent)
      .then((res) => {
        alert("Successfuly Added an Student");
      })
      .catch((err) => {
        console.log(err);
      });
  };
export const addSupervisor =
  (firstName, lastName, email, password, faculty) => (dispatch) => {
    const newSupervisor = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      faculty: faculty,
    };
    return Axios.post(
      "http://localhost:9000/supervisor/addSupervisor",
      newSupervisor
    )
      .then((res) => {
        alert("Successfuly Added an Supervisor");
      })
      .catch((err) => {
        console.log(err);
      });
  };
export const addExaminer =
  (name, email, password, fieldOfWork, isEgyptian) => (dispatch) => {
    const newExaminer = {
      name: name,
      email: email,
      password: password,
      fieldOfWork: fieldOfWork,
      isEgyptian: isEgyptian,
    };
    return Axios.post("http://localhost:9000/examiner/addExaminer", newExaminer)
      .then((res) => {
        alert("Successfuly Added an Examiner");
      })
      .catch((err) => {
        console.log(err);
      });
  };
