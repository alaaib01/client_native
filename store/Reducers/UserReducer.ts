import STORE_CONSTS from "../Consts";

const INITIAL_STATE = {
    username: '',
    prject: '',
    role: '',
    token: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_CONSTS.USER.ACTIONS.LOGIN:
            console.log(action)
            return { ...state, username: action.payload.username, password: action.payload.password }
        case STORE_CONSTS.USER.ACTIONS.LOGOUT:
            return state
        case STORE_CONSTS.USER.ACTIONS.GET_USER:
            return state
        default:
            return state
    }
};



export default userReducer;