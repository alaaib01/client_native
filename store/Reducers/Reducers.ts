import { combineReducers } from 'redux';
import formReducer from './FormReducer'
import userReducer from './UserReducer';
import taskReducer from './TaskReducer'
export default combineReducers({
    form: formReducer,
    user: userReducer,
    tasks: taskReducer
});