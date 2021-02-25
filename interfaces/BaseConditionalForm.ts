
interface IFormResult {
    [key: string]: string
}

interface IBaseConditionalFormProps {
    key: string,
    childComponents?: { key: string, defualt?: boolean, text: string, component: any }[],
    title: string,
    subText?: string,
    helperText?: string,
    setFormValue?: (formValue: IFormResult) => void
}

export {
    IFormResult,
    IBaseConditionalFormProps
}