import { FORM_TYPES } from "../enums/FormTypes";

interface IFormResult {
    [key: string]: string | number | object | null
}
interface IFormControlBase {
    resetInUnmount: boolean,
    uid: string,
    label?: string,
    helperText?: string,
    title?: string,
    placeHolder?: string,
    subTitle?: string,
    multiLine?: boolean
}

interface IFormControlChildren extends IFormControlBase {
    componentId: string
}
interface IFormControlChildrenComponent extends IFormControlBase {
    id: string,
    component: IFormControl
}
interface IFormControl extends IFormControlBase {
    type: FORM_TYPES,
    childComponents: {
        children: IFormControlChildren[]
        components: IFormControlChildrenComponent[]
    },
    finalStep?: boolean
}
interface IFormControlProps extends IFormControlBase {
    childComponents: {
        children: IFormControlChildren[]
        components: IFormControlChildrenComponent[]
    }
    finalStep?: boolean
}

interface IFormControlChildrenComponents {
    children: IFormControlChildren[]
    components: IFormControlChildrenComponent[]
}

export {
    IFormResult,
    IFormControl,
    IFormControlChildrenComponent,
    IFormControlChildren,
    IFormControlChildrenComponents,
    IFormControlProps

}