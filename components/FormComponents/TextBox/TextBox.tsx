import { Form, Input, ListItem, Radio, Text, Textarea } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import FormComponentBuilder from "../../../addons/FormComponentBuilder";
import { FORM_TYPES } from "../../../enums/FormTypes";
import { IFormControlProps } from "../../../interfaces/BaseConditionalForm";

import RightElements from "../../FormComponents/General/RightElements";
import { useDispatch } from "react-redux";
import STORE_CONSTS from "../../../store/Consts";
import GetComponentFromChildren from "../General/GetComponentFromChildren";
import BaseFormComponent from "../General/BaseFormComponent";

interface Props extends IFormControlProps {
  multiLine: boolean | undefined;
}

const TextInput = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();

  const screen = Dimensions.get('screen');
  const dispatch = useDispatch();
  const handleTextChange = (val: string) => {
    dispatch({
      type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
      payload: { [props.uid]: val },
    });
    const component = GetComponentFromChildren(
      props.childComponents,
      props.uid
    );
    if (component) {
      setSelectedComponent(component);
    }
    setValue(val);
  };

  return (
    <BaseFormComponent
      uid={props.uid}
      finalStep={props.finalStep}
      value={value}
      title={props.title}
      subText={props.subTitle}
      helperText={props.helperText}
      subChildren={<RightElements>{selectedComponent}</RightElements>}
    >
      {!!props.multiLine ? (
        <Form style={{width:'100%'}}>
          <Textarea
            rowSpan={6}
            bordered
            placeholder={props.placeHolder}
            style={{  textAlign: "right", direction: "rtl" ,width:screen.width*0.8}}
          />
        </Form>
      ) : (
        <Input
          placeholder={props.placeHolder}
          label={props.title}
          style={{ borderColor: "#a6a6a6", borderWidth: 1, width: "100%" }}
          textAlign="right"
          value={value}
          onChangeText={handleTextChange}
        />
      )}
    </BaseFormComponent>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0,
  },
  listItemText: {
    paddingRight: 10,
    paddingStart: 10,
  },
  listItemIcon: {},
});
