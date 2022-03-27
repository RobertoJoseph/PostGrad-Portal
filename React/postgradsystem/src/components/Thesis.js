import React from "react";
import { useParams } from "react-router-dom";
import "../css/Navbar.css";
import StudentNavbar from "./StudentNavbar";
function Thesis(props) {
  let { studentID } = useParams();
  return (
    <>
    <StudentNavbar></StudentNavbar>
    </>
  );
}
export default Thesis;
