import studentReducer from "./students";
import loginReducer from "./login";
import { combineReducers } from "redux";
import { createForms } from "react-redux-form";
import { StudentForm } from "../redux/studentForm";

const allReducers = combineReducers({
  students: studentReducer,
  LoginFlag: loginReducer,
  ...createForms({
    studentForm: StudentForm,
  }),
});
export default allReducers;
