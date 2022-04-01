import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import StudentNavbar from "./StudentNavbar";
import Axios from "axios";
function Thesis(props) {
  const [thesis, setThesis] = useState([]);
  useEffect(() => {
    Axios.get(
      `http://localhost:9000/students/studenttheses/${props.studentID}`
    ).then((res) => {
      setThesis(res.data);
    });
  }, []);

  return (
    <div>
      {thesis.map((item, index) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
    </div>
  );
}
export default Thesis;
