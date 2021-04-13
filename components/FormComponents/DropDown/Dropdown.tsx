import { Icon, Picker } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IFormControlProps } from "../../../interfaces/BaseConditionalForm";
import STORE_CONSTS from "../../../store/Consts";
import BaseFormComponent from "../General/BaseFormComponent";
import GetComponentFromChildren from "../General/GetComponentFromChildren";
import RightElements from "../General/RightElements";

interface Props extends IFormControlProps {}

const Dropdown = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();
  const dispatch = useDispatch();

  /**
   * change selected value in state and in update store
   * load next component based on current selection
   * @param val selected value
   */
  const handleChangeValue = (val: string) => {
    setSelectedValue(val);
    dispatch({
      type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
      payload: { [props.uid]: val },
    });
    const component = GetComponentFromChildren(props.childComponents, val);
    if (component) {
      setSelectedComponent(component);
    }
    if (props.childComponents.children.find((c) => c.uid === val)?.finalStep) {
      dispatch({
        type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
        payload: { allowSave: true },
      });
    }
  };

  return (
    <BaseFormComponent
      uid={props.uid}
      value={selectedValue}
      finalStep={props.finalStep}
      title={props.title}
      subText={props.subTitle}
      helperText={props.helperText}
      subChildren={
        <RightElements>
          {selectedValue === "-1000" ? null : selectedComponent}
        </RightElements>
      }
    >
      <Picker
        mode="dropdown"
        iosHeader="נא לבחור תשובה"
        selectedValue={selectedValue || null}
        onValueChange={handleChangeValue}
        iosIcon={<Icon name="down" type="AntDesign" />}
        style={{ width: "100%", direction: "rtl" }}
        placeholder={props.placeHolder}
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
      >
        <Picker.Item key={"emptySelect"} label={""} value={"-1000"} />
        {props.childComponents.children.map((child) => {
          return (
            <Picker.Item
              key={child.uid}
              label={child.label || ""}
              value={child.uid}
            />
          );
        })}
      </Picker>
    </BaseFormComponent>
  );
};

export default Dropdown;
