import { Icon, Input, Item } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  textChanged: (text: string) => void;
  icon:string;
  iconType?:string;
  placeHolder:string;
  secure?:boolean;
  active?:boolean
}

const TextBox = (props: Props) => {
  const [value, setValue] = useState("");
  const valueChange = (txt: string) => {
    setValue(txt);
    if (props.textChanged) props.textChanged(txt);
  };
  return (
    <Item rounded style={styles.inputContainer}>
      <Icon style={styles.icon} active={!!props.active} name={props.icon} type={props.iconType} />
      <Input
        style={styles.text}
        placeholder={props.placeHolder}
        secureTextEntry={!!props.secure}
        value={value}
        onChangeText={valueChange}
      ></Input>
    </Item>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFFDB",
    marginVertical: 10,
    color: "#fff",
    backgroundColor: "#FFFFFFDB",
  },
  resultContainer: {
    borderWidth: 0,
    marginVertical: 10,
    borderColor: "transparent",

    backgroundColor: "transparent",
  },
  icon: {
    marginStart: 17,
  },
  text: {
    marginStart: 5,
    direction: "rtl",
    textAlign: "right",
    color: "#4f4e4e",
  },
});
