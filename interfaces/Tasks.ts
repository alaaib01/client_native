interface ITaskSummaryData {
    data: { [key: string]: { label: string, value: string } },
    order: string[],
    date?:string
}


export {
    ITaskSummaryData
}