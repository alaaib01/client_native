import { Text, View } from "native-base";
import React from "react";
import CheckBoxList from "../components/FormComponents/CheckBox/CheckBoxList";
import DateTimePicker from "../components/FormComponents/DateTimePicker/DateTimePicker";
import Dropdown from "../components/FormComponents/DropDown/Dropdown";
import VideoImage from "../components/FormComponents/Media/VideoImage";
import RadioGroup from "../components/FormComponents/Radio/RadioButtonList";
import TextInput from "../components/FormComponents/TextBox/TextBox";
import { FORM_TYPES } from "../enums/FormTypes";
import { IFormControl } from "../interfaces/BaseConditionalForm";

const FormComponentBuilder = (props: IFormControl) => {
  switch (props.type) {
    case FORM_TYPES.DROPDOWN:
      return (
        <Dropdown
          uid={props.uid}
          title={props.title}
          subTitle={props.subTitle}
          helperText={props.helperText}
          finalStep={props.finalStep}
          placeHolder={props.placeHolder || ""}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    case FORM_TYPES.RADIO_GROUP:
      return (
        <RadioGroup
          uid={props.uid}
          title={props.title}
          finalStep={props.finalStep}
          subTitle={props.subTitle}
          helperText={props.helperText}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    case FORM_TYPES.CHECK_BOX:
      return (
        <CheckBoxList
          uid={props.uid}
          finalStep={props.finalStep}
          title={props.title}
          subTitle={props.subTitle}
          helperText={props.helperText}
          placeHolder={props.placeHolder || ""}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    case FORM_TYPES.DATE_PICKER:
      return (
        <DateTimePicker
          uid={props.uid}
          finalStep={props.finalStep}
          title={props.title}
          subTitle={props.subTitle}
          helperText={props.helperText}
          placeHolder={props.placeHolder || ""}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    case FORM_TYPES.TEXT_INPUT:
      return (
        <TextInput
          uid={props.uid}
          finalStep={props.finalStep}
          title={props.title}
          subTitle={props.subTitle}
          helperText={props.helperText}
          placeHolder={props.placeHolder || ""}
          multiLine={props.multiLine}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    case FORM_TYPES.IMAGE_UPLOADER:
      return (
        <VideoImage
          uid={props.uid}
          finalStep={props.finalStep}
          title={props.title}
          subTitle={props.subTitle}
          helperText={props.helperText}
          placeHolder={props.placeHolder || ""}
          multiLine={props.multiLine}
          resetInUnmount={props.resetInUnmount || true}
          childComponents={props.childComponents}
        />
      );
    default:
      return <Text></Text>;
  }
};

export default FormComponentBuilder;
