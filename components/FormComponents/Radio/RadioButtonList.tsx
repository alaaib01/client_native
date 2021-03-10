import { ListItem, Radio, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import FormComponentBuilder from '../../../addons/FormComponentBuilder';
import { IFormControlProps } from '../../../interfaces/BaseConditionalForm';

import RightElements from '../../FormComponents/General/RightElements';
import STORE_CONSTS from '../../../store/Consts';
import { useDispatch } from 'react-redux';
import GetComponentFromChildren from '../General/GetComponentFromChildren';
import BaseFormComponent from '../General/BaseFormComponent';


interface Props extends IFormControlProps {

}

const RadioGroup = (props: Props) => {
    const [selectedKey, setSelectedKey] = useState<String | number>('');
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element>()
    const dispatch = useDispatch()
    const handleSelectionChanged = (propName: string) => {
        setSelectedKey(propName)
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
    return (
        <BaseFormComponent
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
                    <Radio selected={selectedKey === child.uid} onPress={() => handleSelectionChanged(child.uid)} />
                    <Text style={styles.listItemText}>{child.label}</Text>
                </ListItem>
            })}
        </BaseFormComponent>
    )
}

export default RadioGroup

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
