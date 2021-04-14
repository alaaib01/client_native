import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Badge,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Calender from "../components/Calender/Calender";
import CalendarScreen from "./CalendarScreen";

interface Props {}

const TabsScreen = (props: Props) => {
  const [tabCounts, setTabCounts] = useState({ tab1: 0, tab2: 0 });
  return (
    <Container>
      <Tabs>
        <Tab
          heading={
            <TabHeading>
              <Text>מתוזמנות ({tabCounts.tab1})</Text>
            </TabHeading>
          }
        >
          <Calender
            setTabCount={(num: number) => {
              setTabCounts((currState) => {
                return {
                  tab1: currState.tab1,
                  tab2: num,
                };
              });
            }}
            formTypes={[1]}
          />
        </Tab>

        <Tab
          heading={
            <TabHeading>
              <Text>מתואמות ({tabCounts.tab2})</Text>
            </TabHeading>
          }
        >
          <Calender
            setTabCount={(num: number) => {
              setTabCounts((currState) => {
                return {
                  tab1: currState.tab1,
                  tab2: num,
                };
              });
            }}
            formTypes={[2, 3, 4, 5, 6, 7]}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsScreen;

const styles = StyleSheet.create({});