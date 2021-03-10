import STORE_CONSTS from "../Consts";

const INITIAL_STATE = {
    formValues: {}
};

const formReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_CONSTS.FORM.ACTIONS.ADD_PROP:
            state.formValues = { ...state.formValues, ...action.payload }
            return state
        case STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP:
            delete state.formValues[action.payload.key]
            return state
        default:
            return state
    }
};



export default formReducer;