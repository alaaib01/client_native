import { Button, Icon, View, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Calender from "../components/Calender/Calender";

interface Props {
  formTypes: number[];
}

const CalendarScreen = (props: Props) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <View style={{ flex: 1 }}>
      <Button
        transparent
        onPress={() => {
          setVisible(!visible);
        }}
      >
        <Icon name="calendar" />
        <Text>הצג יומן</Text>
      </Button>
      <Calender formTypes={props.formTypes} visible={visible} />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
