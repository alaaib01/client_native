import axios from "axios"
import { TaskDTO } from "../../interfaces/Tasks"
import { SERVER_URL, TASKS_END_POINTS } from "../Consts"


const getTasksByUserId = (userId: string, stateDate: Date, endDate: Date, callBack: (data: TaskDTO[]) => any) => {
    let startTmp = stateDate.setHours(0, 0, 0, 0).toString();
    let endTmp = endDate.setHours(23, 59, 59).toString();

    axios.get(`${SERVER_URL}${TASKS_END_POINTS.GET_TASKS_BY_USER_ID}${userId}/${startTmp}/${endTmp}`).then((result) => {
        if (result.data) {
            callBack(result.data)
        }
        else
            return []

    }).catch((err) => {
        // log the error
        console.log(err)
        // return empty 
        return []
    })
}


const getTasksMarksByUserId = (userId: string, callBack: (data: TaskDTO[]) => any) => {
    axios.get(`${SERVER_URL}${TASKS_END_POINTS.GET_TASKS_MARKS}${userId}`).then((result) => {
        if (result.data) {
            callBack(result.data)
        }
        else
            return []

    }).catch((err) => {
        // log the error
        console.log(err)
        // return empty 
        return []
    })
}
export {
    getTasksByUserId,
    getTasksMarksByUserId
}