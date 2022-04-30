import studentReducer from "./students";
import { combineReducers } from "redux";
import { createForms } from "react-redux-form";
import { StudentForm } from "../redux/studentForm";
import { SupervisorForm } from "../redux/supervisorForm";

const allReducers = combineReducers({
  students: studentReducer,
  ...createForms({
    studentForm: StudentForm,
    supervisorForm: SupervisorForm,
    loginForm: "1",
    addPublicationForm: "2",
    linkPublicationForm: "3",
    examinerForm: "4",
    moreInfoForm: "5",
    payment: "6",
    installments:"7",
  }),
});
export default allReducers;
