import * as ActionTypes from "../redux/actionTypes";
const isLogged = (state = [], action) => {
 
  console.log("Checking for Credentials");
  switch (action.type) {
    case ActionTypes.IS_LOGGED:
      return state.concat(action.payload);
    default:
      return state;
  }
};
export default isLogged;