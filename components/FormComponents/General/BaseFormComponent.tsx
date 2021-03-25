import { Content, H2, H3, ListItem, Separator, Text, View } from "native-base";
import React, { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import STORE_CONSTS from "../../../store/Consts";
import RightElements from "./RightElements";

interface Props {
  title?: string;
  subText?: string;
  helperText?: string;
  children: ReactNode;
  subChildren: ReactNode;
  value: any;
  finalStep?: boolean;
  uid: string;
}

const BaseFormComponent = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // if current value is not null and this step is a final step
    // then allow save button through store
    if (!!props.value && !!props.finalStep) {
      dispatch({
        type: STORE_CONSTS.FORM.ACTIONS.ADD_PROP,
        payload: { allowSave: true },
      });
    }
  }, [props.value]);
  
  useEffect(() => {
    return () => {
      dispatch({
        type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP,
        payload: { key: props.uid },
      });
      dispatch({
        type: STORE_CONSTS.FORM.ACTIONS.REMOVE_PROP,
        payload: { key: "allowSave" },
      });
    };
  }, []);
  return (
    <Content style={{ marginVertical: 5 }}>
      <RightElements>
        {props.title ? <H2>{props.title}</H2> : null}
        {props.subText ? <H3>{props.subText}</H3> : null}
      </RightElements>
      {props.children}
      <RightElements>
        {props.helperText ? <Text>{props.helperText}</Text> : null}
      </RightElements>

      <Separator style={{ backgroundColor: "transparent" }}></Separator>
      <View style={{ marginVertical: 5 }}></View>
      {props.subChildren}
    </Content>
  );
};

export default BaseFormComponent;

const styles = StyleSheet.create({});
