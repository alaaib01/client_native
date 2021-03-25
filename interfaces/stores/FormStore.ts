export interface FormValues {
    [key: string]: string
}

export interface IAction {
    type: string,
    payload?: FormValues | number,
    key: string
}