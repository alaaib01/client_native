import { combineReducers } from 'redux';
import formReducer from './FormReducer'
import userReducer from './UserReducer';

export default combineReducers({
    form: formReducer,
    user: userReducer
});