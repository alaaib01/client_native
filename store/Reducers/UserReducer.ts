import STORE_CONSTS from "../Consts";

const INITIAL_STATE = {
    access_token: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_CONSTS.USER.ACTIONS.LOGIN:
            const newState = Object.assign(state, {
                access_token: action.payload.access_token,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            })
            return newState
        case STORE_CONSTS.USER.ACTIONS.LOGOUT:
            return INITIAL_STATE
        case STORE_CONSTS.USER.ACTIONS.GET_USER:
            return state
        default:
            return state
    }
};



export default userReducer;