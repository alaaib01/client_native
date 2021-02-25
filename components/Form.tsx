import { Content } from 'native-base'
import React, { Children, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IFormChildComponent, IFormComponent, IFormResult } from '../interfaces/BaseConditionalForm'
import { FORM_TYPES } from '../enums/FormTypes'
import FormComponentBuilder from '../addons/FormComponentBuilder'
import FormExample from '../FormExample'
interface Props {

}
interface IFormControl {
    type: number;
    resetInUnmount: boolean;
    propName: string;
    helperText: string;
    key: string;
    title: string;
    subText: string;
    placeHolder: string;
    childComponents: ({
        propName: string;
        type: number;
        component: IFormComponent | Element | JSX.Element;
        text: string;
        value: number;
    })[];
}
const getChildComponent = (formControl: IFormControl, updateFormValues: (values: IFormResult) => void) => {
    return <FormComponentBuilder
        type={formControl.type}
        resetInUnmount={formControl.resetInUnmount}
        propName={formControl.propName}
        helperText={formControl.helperText}
        key={formControl.key}
        title={formControl.title}
        setFormValue={updateFormValues}
        subText={formControl.subText}
        childComponents={formControl.childComponents.map(child => {
            return {
                type: child.type,
                propName: child.propName,
                text: child.text,
                value: child.value,
                component: child.type !== FORM_TYPES.ELEMENT ? child.component : <Text>{child.text}</Text>,
            }
        })}
    ></FormComponentBuilder>
}

const Form = (props: Props) => {
    const [formValues, setFormValues] = useState({})

    const updateFormValues = (values: IFormResult) => {
        setFormValues((currentState) => { return { ...currentState, ...values } })

    }

    return (
        <Content style={styles.root}>
            {
                FormExample.map(formControl => {
                    return getChildComponent(formControl, updateFormValues)
                })
            }
        </Content>
    )
}

export default Form

const styles = StyleSheet.create({
    root: {
        margin: 15
    }
})
