import { Content, H2, H3, Icon, ListItem, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import FormComponentBuilder from '../addons/FormComponentBuilder'
import { FORM_TYPES } from '../enums/FormTypes'
import { IBaseConditionalFormProps, IFormComponent } from '../interfaces/BaseConditionalForm'
import BaseFormComponent from './BaseFormComponent'
import RightElements from './RightElements'

interface Props extends IBaseConditionalFormProps {
    placeHolder: string
}

const Dropdown = (props: Props) => {
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element | IFormComponent>()
    const handleChangeValue = (val: string) => {
        setSelectedValue(val)
        if (props.setFormValue)
            props.setFormValue({ [props.propName]: val })
        const component = props.childComponents?.find(child => child.propName === val || (!!child.defualt && !selectedValue))
        if (component?.type === FORM_TYPES.ELEMENT)
            setSelectedComponent(component?.component)
        else if (component?.component) {
            const child: IFormComponent = component.component;
            setSelectedComponent(FormComponentBuilder({ ...child }))
        }

    }
    useEffect(() => {
        return () => {
            if (props.setFormValue && props.resetInUnmount)
                props.setFormValue({ [props.propName]: null })
        }
    }, [])
    return (
        <BaseFormComponent
            title={props.title}
            subText={props.subText}
            helperText={props.helperText}
            subChildren={
                <RightElements>
                    {selectedComponent}
                </RightElements>
            }>

            <Picker
                mode="dropdown"
                iosHeader="נא לבחור תשובה"
                selectedValue={selectedValue}
                onValueChange={handleChangeValue}
                iosIcon={<Icon name="down" type='AntDesign' />}
                style={{ width: '100%', direction: 'rtl' }}
                placeholder={props.placeHolder}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"

            >

                {props.childComponents?.map(child => {
                    return <Picker.Item key={child.propName} label={child.text} value={child.propName} />
                })}

            </Picker>
        </BaseFormComponent>
    )
}

export default Dropdown

const styles = StyleSheet.create({})
