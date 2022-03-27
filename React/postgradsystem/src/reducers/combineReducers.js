import studentReducer from "./students";
import loginReducer from "./login";
import { combineReducers } from "redux";
import { createForms } from "react-redux-form";
import { StudentForm } from "../redux/studentForm";
import { LoginForm } from "../redux/loginForm";
import Login from "./Login";

const allReducers = combineReducers({
  isLogged: Login,
  students: studentReducer,
  LoginFlag: loginReducer,
  ...createForms({
    studentForm: StudentForm,
    loginForm: LoginForm,
  }),
});
export default allReducers;
