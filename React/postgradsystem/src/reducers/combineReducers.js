import studentReducer from './students'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    students: studentReducer
})
export default allReducers;
