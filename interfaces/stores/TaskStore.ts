import { TaskDTO } from "../Tasks";

export interface IAction {
    payload: { tasks?: TaskDTO[], key?: string },
    type: string
}