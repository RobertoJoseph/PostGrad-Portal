import Axios from "axios";

export const getStudents = () => (dispatch) => {
  console.log("Action creator get callsdsded");

  return Axios.get("http://localhost:9000/students")
    .then((response) => {
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

export const addUser = ()=>(dispatch)=>{
    
}
