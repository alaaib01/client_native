import { CheckBox, ListItem, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { IFormControlProps } from '../../../interfaces/BaseConditionalForm'
import STORE_CONSTS from '../../../store/Consts'

import RightElements from '../../FormComponents/General/RightElements'
import BaseFormComponent from '../General/BaseFormComponent'
import GetComponentFromChildren from '../General/GetComponentFromChildren'

interface Props extends IFormControlProps {
    placeHolder: string
}

const CheckBoxList = (props: Props) => {

    const [selectedValue, setSelectedValue] = useState<string>('')
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element>()
    const dispatch = useDispatch()
    const handleSelectionChanged = (propName: string) => {
        setSelectedValue(propName)
        dispatch({ type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP, payload: { [props.uid]: propName } })
        const component = GetComponentFromChildren(props.childComponents, propName)
        if (component) {
            setSelectedComponent(component)
        }
    }
    useEffect(() => {
        return () => {
            if (props.resetInUnmount)
                dispatch({ type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP, payload: { 'key': props.uid } })
        }
    }, [])
    return (<BaseFormComponent
        title={props.title}
        subText={props.subTitle}
        helperText={props.helperText}
        subChildren={
            <RightElements>
                {selectedComponent}
            </RightElements>
        }>

        {props.childComponents.children.map(child => {
            return <ListItem key={child.uid} onPress={() => handleSelectionChanged(child.uid)} style={styles.listItem}>
                <CheckBox checked={selectedValue === child.uid} />
                <View style={styles.listItemText}>
                    <Text>  {child.label}</Text>
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
