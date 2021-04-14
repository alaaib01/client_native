import { Button, Icon, View, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Calender from "../components/Calender/Calender";

interface Props {
  formTypes: number[];
  setTabCount : (num:number)=>void
}

const CalendarScreen = (props: Props) => {
  
  return (
    <View style={{ flex: 1 }}>
      <Calender setTabCount={props.setTabCount} formTypes={props.formTypes} />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
