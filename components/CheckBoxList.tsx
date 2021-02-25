import { Body, CheckBox, Content, H2, H3, ListItem, Radio } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FormComponentBuilder from '../addons/FormComponentBuilder'
import { FORM_TYPES } from '../enums/FormTypes'
import { IBaseConditionalFormProps, IFormComponent } from '../interfaces/BaseConditionalForm'
import BaseFormComponent from './BaseFormComponent'
import RightElements from './RightElements'

interface Props extends IBaseConditionalFormProps {
    placeHolder: string
}

const CheckBoxList = (props: Props) => {

    const [selectedValue, setSelectedValue] = useState<string>('')
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element | IFormComponent>()
    const handleSelectionChanged = (propName: string) => {

        setSelectedValue(propName)
        if (props.setFormValue)
            props.setFormValue({ [props.propName]: propName })
        const component = props.childComponents?.find(child => child.propName === selectedValue || (!!child.defualt && !selectedValue))
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
    return (<BaseFormComponent
        title={props.title}
        subText={props.subText}
        helperText={props.helperText}
        subChildren={
            <RightElements>
                {selectedComponent}
            </RightElements>
        }>

        {props.childComponents?.map(child => {
            return <ListItem key={child.propName} onPress={() => handleSelectionChanged(child.propName)} style={styles.listItem}>
                <CheckBox checked={selectedValue === child.propName} />
                <View style={styles.listItemText}>
                    {child.component}
                </View>
            </ListItem>
        })}
    </BaseFormComponent>
    )
}

export default CheckBoxList

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 0
    },
    listItemText: {
        paddingRight: 10,
        paddingStart: 10
    },
    listItemIcon: {

    }
})
