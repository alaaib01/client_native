import { IAction } from "../../interfaces/stores/TaskStore";
import { TaskDTO } from "../../interfaces/Tasks";
import STORE_CONSTS from "../Consts";

const INITIAL_STATE: { tasks: TaskDTO[] } = {
    tasks: []
};


const taskReducer = (state = INITIAL_STATE, action: IAction) => {
    switch (action.type) {
        case STORE_CONSTS.TASK.ACTIONS.ADD_TASKS:
            state.tasks = action.payload.tasks || []
            return state
        case STORE_CONSTS.TASK.ACTIONS.REMOVE_TASK:
            if (!!action.payload.key)
                return state.tasks.slice(state.tasks.findIndex(x => x.id === action.payload.key), 1)
            else return state
        default:
            return state
    }
};



export default taskReducer;