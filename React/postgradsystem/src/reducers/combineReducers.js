import studentReducer from "./students";
import { combineReducers } from "redux";
import { createForms } from "react-redux-form";
import { StudentForm } from "../redux/studentForm";
import { LoginForm } from "../redux/loginForm";

const allReducers = combineReducers({
  students: studentReducer,
  ...createForms({
    studentForm: StudentForm,
    loginForm: LoginForm,
  }),
});
export default allReducers;