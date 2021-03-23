import STORE_CONSTS from "../Consts";

const INITIAL_STATE = {
    formValues: {},
    taskId: -1
};

const formReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_CONSTS.FORM.ACTIONS.ADD_PROP:
            state.formValues = { ...state.formValues, ...action.payload }
            return state
        case STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID:
            state.taskId = action.payload
            return state
        case STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP:
            delete state.formValues[action.payload.key]
            return state
        default:
            return state
    }
};



export default formReducer;