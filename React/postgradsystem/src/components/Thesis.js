import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import StudentNavbar from "./StudentNavbar";
import Axios from "axios";
function Thesis(props) {
  let { studentID } = useParams();
  const [thesis, setThesis] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:9000/students/studenttheses/${studentID}`).then(
      (res) => {
        setThesis(res.data);
      }
    );
  }, []);

  return (
    <>
      <StudentNavbar></StudentNavbar>
      {thesis.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
}
export default Thesis;
