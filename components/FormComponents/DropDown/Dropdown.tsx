import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IFormControlProps } from '../../../interfaces/BaseConditionalForm'
import STORE_CONSTS from '../../../store/Consts'
import BaseFormComponent from '../General/BaseFormComponent'
import GetComponentFromChildren from '../General/GetComponentFromChildren'
import RightElements from '../General/RightElements'

interface Props extends IFormControlProps {
}

const Dropdown = (props: Props) => {
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element>()
    const dispatch = useDispatch()

    const handleChangeValue = (val: string) => {
        setSelectedValue(val)
        dispatch({ type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP, payload: { [props.uid]: val } })
        const component = GetComponentFromChildren(props.childComponents, val)
        if (!!val && (!!props.finalStep || true)) {
            dispatch({ type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP, payload: { allowSave: true } })
        }
        if (component) {
            setSelectedComponent(component)
        }

    }
    useEffect(() => {
        return () => {
            if (props.resetInUnmount)
                dispatch({ type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP, payload: { 'key': props.uid } })
            if (!!props.finalStep || true) {
                dispatch({ type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP, payload: { 'key': 'allowSave' } })
            }
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

            <Picker
                mode="dropdown"
                iosHeader="נא לבחור תשובה"
                selectedValue={selectedValue || null}
                onValueChange={handleChangeValue}
                iosIcon={<Icon name="down" type='AntDesign' />}
                style={{ width: '100%', direction: 'rtl' }}
                placeholder={props.placeHolder}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"

            >

                {props.childComponents.children.map(child => {
                    return <Picker.Item key={child.uid} label={child.label || ''} value={child.uid} />
                })}

            </Picker>
        </BaseFormComponent>
    )
}

export default Dropdown


