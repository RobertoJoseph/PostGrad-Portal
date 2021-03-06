import React from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
// import { BsBrightnessAltHigh } from "react-icons/bs";
// import { Button } from "reactstrap";
// import { faSignIn, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/images/kaka.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div>
      <h2 className="h2-big">POSTGRAD OFFICE</h2>
      <h1 className="h1-big">Welcome to German University in Egypt</h1>
      <h4 className="h4-big">THIS WEBPAGE KEEPS TRACK OF POSTGRAD STUDENTS</h4>
      <div className={classes.root}>
        <CssBaseline />
      </div>
      <div className="container">
        <div className="row">
          <div className=" col-12 col-md-6">
            <Register
              addStudent={props.addStudent}
              addSupervisor={props.addSupervisor}
              resetFeedBackForm={props.resetFeedBackForm}
              addExaminer={props.addExaminer}
            ></Register>
          </div>
          <div className="col-12 col-md-6">
            <Login> userLogin={props.userLogin} </Login>
          </div>
        </div>
      </div>
    </div>
  );
}


