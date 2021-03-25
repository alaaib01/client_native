import { TaskDTO } from "../../interfaces/Tasks";
import STORE_CONSTS from "../Consts";

export default {
    ADD_TASKS: (tasks: TaskDTO[]) => {
        return {
            type: STORE_CONSTS.TASK.ACTIONS.ADD_TASKS,
            payload: {
                tasks: tasks
            }
        }
    },
    REMOVE_TASK: (taskId: string) => {
        return {
            type: STORE_CONSTS.TASK.ACTIONS.REMOVE_TASK,
            payload: {
                key: taskId
            }
        }
    }
}

