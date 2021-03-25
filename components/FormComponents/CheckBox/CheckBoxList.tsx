import { CheckBox, ListItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { IFormControlProps } from "../../../interfaces/BaseConditionalForm";
import STORE_CONSTS from "../../../store/Consts";

import RightElements from "../../FormComponents/General/RightElements";
import BaseFormComponent from "../General/BaseFormComponent";
import GetComponentFromChildren from "../General/GetComponentFromChildren";

interface Props extends IFormControlProps {
  placeHolder: string;
  multipal?: boolean;
}

const CheckBoxList = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();
  const dispatch = useDispatch();
  const handleSelectionChanged = (propName: string) => {
    // get current state
    let currState = selectedValue;
    // if selected value already exists remove it
    if (props.multipal) {
      if (currState.indexOf(propName) >= 0)
        currState = currState.filter((x) => x !== propName);
      // if selected value doesnt exist push it
      else currState.push(propName);
    } else currState = [propName];
    //update current value if its a multipal choose set curr state else set propname
    setSelectedValue(currState);
    // update form store , with the new formvalue state
    dispatch({
      type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
      payload: { [props.uid]: currState },
    });

    // get component based on selection
    const component = GetComponentFromChildren(props.childComponents, propName);
    if (component) {
      setSelectedComponent(component);
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
      subChildren={<RightElements>{selectedComponent}</RightElements>}
    >
      {props.childComponents.children.map((child) => {
        return (
          <ListItem
            key={child.uid}
            onPress={() => handleSelectionChanged(child.uid)}
            style={styles.listItem}
          >
            <CheckBox checked={selectedValue.indexOf(child.uid) >= 0} />
            <View style={styles.listItemText}>
              <Text> {child.label}</Text>
            </View>
          </ListItem>
        );
      })}
    </BaseFormComponent>
  );
};

export default CheckBoxList;

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
