import counterReducer from './counter';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';


// initial state for redux store
// const initialState = {
//     age: 22
// };

const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
});

export default rootReducer;