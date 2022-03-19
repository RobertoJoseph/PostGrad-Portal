import * as ActionTypes from "../redux/actionTypes";
const Login = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.STUDENT_LOGIN_SUCCESS:
      return true;
    case ActionTypes.STUDENT_LOGOUT:
      return false;
    default:
      return state;
  }
};
export default Login;