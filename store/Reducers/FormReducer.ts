import { FormValues, IAction } from "../../interfaces/stores/FormStore";
import STORE_CONSTS from "../Consts";



const INITIAL_STATE: { formValues: FormValues, taskId: number } = {
    formValues: {},
    taskId: -1
};


const formReducer = (state = INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case STORE_CONSTS.FORM.ACTIONS.ADD_PROP:
            if (typeof action.payload === "object")
                state.formValues = { ...state.formValues, ...action.payload }
            return state
        case STORE_CONSTS.FORM.ACTIONS.SET_TASK_ID:
            if (typeof action.payload === "number")
                state.taskId = action.payload
            return state
        case STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP:
            if (typeof action.payload === "object" && action.payload.key)
                delete state.formValues[action.payload.key]
            return state
        default:
            return state
    }
};



export default formReducer;