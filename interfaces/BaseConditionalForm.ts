import { FORM_TYPES } from "../enums/FormTypes";

interface IFormResult {
    [key: string]: string | number | null
}
interface IFormElement {
    element: JSX.Element
}
interface IFormChildComponent {
    type: FORM_TYPES,
    text: string,
    defualt?: true,
    value: string | number,
    propName: string,
    component: IFormComponent | JSX.Element
    
}
interface IFormComponent {
    type: FORM_TYPES,
    propName: string,
    title: string,
    subText?: string,
    helperText?: string,
    resetInUnmount?: boolean,
    childComponents: IFormChildComponent[],
    placeHolder?: string,
    setFormValue?: (formValue: IFormResult) => void
}

interface IBaseConditionalFormProps {
    propName: string,
    childComponents?: IFormChildComponent[],
    title: string,
    subText?: string,
    helperText?: string,
    resetInUnmount?: boolean
    setFormValue?: (formValue: IFormResult) => void
}

export {
    IFormResult,
    IBaseConditionalFormProps,
    IFormComponent,
    IFormChildComponent,
    IFormElement
}