import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialStudentForm } from './forms';
import { studentData } from './studentData';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            studentData: studentData,
            ...createForms({
                studentForm: InitialStudentForm
            })
        })
    );
    applyMiddleware(thunk,logger)

    return store;
}