import studentReducer from "./students";
import { combineReducers } from "redux";
import { createForms } from "react-redux-form";
import { StudentForm } from "../redux/studentForm";

const allReducers = combineReducers({
  students: studentReducer,
  ...createForms({
    studentForm: StudentForm,
  }),
});
export default allReducers;
