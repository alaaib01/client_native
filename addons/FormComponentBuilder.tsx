import { View } from 'native-base'
import React from 'react'
import CheckBoxList from '../components/CheckBoxList'
import Dropdown from "../components/Dropdown"
import RadioGroup from '../components/RadioGroup'
import TextInput from '../components/TextInput'
import { FORM_TYPES } from "../enums/FormTypes"
import { IFormComponent, IFormElement } from "../interfaces/BaseConditionalForm"

const FormComponentBuilder = (props: IFormComponent) => {
    switch (props.type) {
        case FORM_TYPES.DROPDOWN:
            return <Dropdown setFormValue={props.setFormValue} propName={props.propName}
                title={props.title}
                subText={props.subText}
                helperText={props.helperText}
                placeHolder={props.placeHolder || ''}
                resetInUnmount={props.resetInUnmount}
                childComponents={props.childComponents} />
        case FORM_TYPES.RADIO_GROUP:
            return <RadioGroup setFormValue={props.setFormValue} propName={props.propName}
                title={props.title}
                subText={props.subText}
                helperText={props.helperText}
                resetInUnmount={props.resetInUnmount}
                childComponents={props.childComponents} />
        case FORM_TYPES.CHECK_BOX:
            return <CheckBoxList setFormValue={props.setFormValue} propName={props.propName}
                title={props.title}
                subText={props.subText}
                helperText={props.helperText}
                placeHolder={props.placeHolder || ''}
                resetInUnmount={props.resetInUnmount}
                childComponents={props.childComponents} />
        case FORM_TYPES.TEXT_INPUT:
            return <TextInput setFormValue={props.setFormValue} propName={props.propName}
                title={props.title}
                subText={props.subText}
                helperText={props.helperText}
                placeHolder={props.placeHolder || ''}
                resetInUnmount={props.resetInUnmount}
                childComponents={props.childComponents} />

        default:
            return <View></View>
    }

}

export default FormComponentBuilder