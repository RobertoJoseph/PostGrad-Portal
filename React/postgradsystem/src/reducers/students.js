import * as ActionTypes from "../redux/actionTypes";
const Students = (state = [], action) => {
 
  console.log("Iam in the stuereducer");
  switch (action.type) {
    case "SHOW_STUDENTS":
      return state.concat(action.payload);
    default:
      return state;
  }
};
export default Students;
