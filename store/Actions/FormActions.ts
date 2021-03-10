import STORE_CONSTS from "../Consts";

export const addProp = (propName: string, propValue: any) => (
    {
        type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
        payload: {},
    }
);


export const removeProp = (propName: string, propValue: any) => (
    {
        type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP,
        payload: {},
    }
);