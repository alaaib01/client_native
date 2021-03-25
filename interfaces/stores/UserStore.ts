export interface IAction {
    type: string;
    payload: {
        access_token: string;
        firstname: string | undefined;
        lastname: string | undefined
    }
}