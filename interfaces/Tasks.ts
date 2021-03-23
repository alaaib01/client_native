interface ITaskSummaryData {
    data: { [key: string]: { label: string, value: string } },
    order: string[],
    date?: number,
    formType?:number,
    taskId:number
}




class TaskDTO {
    id?: string;
    formType: number;
    project: number;
    createBy: string;
    data: { task: ITaskSummaryData, taskSummary: ITaskSummaryData };;
    result: object;
    date: number;
    user: string
}

export {
    ITaskSummaryData,
    TaskDTO
}