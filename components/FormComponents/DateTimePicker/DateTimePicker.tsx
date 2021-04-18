import { DatePicker } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { IFormControlProps } from "../../../interfaces/BaseConditionalForm";

import RightElements from "../../FormComponents/General/RightElements";
import { useDispatch } from "react-redux";
import STORE_CONSTS from "../../../store/Consts";
import GetComponentFromChildren from "../General/GetComponentFromChildren";
import BaseFormComponent from "../General/BaseFormComponent";

interface Props extends IFormControlProps {

}

const DateTimePicker = (props: Props) => {
  const [value, setValue] = useState<Date>();
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();

  const dispatch = useDispatch();
  const handleTextChange = (val: Date) => {
    dispatch({
      type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
      payload: { [props.uid]: val.getTime() },
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
   <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            locale={"he"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="בחר תאריך"
            onDateChange={handleTextChange}
            disabled={false}
            />
    </BaseFormComponent>
  );
};

export default DateTimePicker;

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
