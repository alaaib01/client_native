import React from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  Right,
  Grid,
  Col,
  Row,
} from "native-base";
import RightElements from "../FormComponents/General/RightElements";
import { ITaskSummaryData } from "../../interfaces/Tasks";
import { CommonActions, useNavigation } from "@react-navigation/native";
import FormTypeToName from "../../constants/Forms";
interface Props extends ITaskSummaryData {
  hideBeginButton?: boolean;
}

const TaskSummary = (props: Props) => {
  const rightCol: JSX.Element[] = [];
  const leftCol: JSX.Element[] = [];
  // navigate to selected task
  const navigator = useNavigation();
  const navigateToTask = () => {
    navigator.dispatch(
      CommonActions.navigate({
        name: "משימה",
        params: {
          task: props,
        },
      })
    );
  };

  // create 2 columns to arrange data based on order if exsits
  // label and vlaue of each element is based on object value
  for (
    let i = 0;
    i < props.order.length || i < Object.keys(props.data).length;
    i++
  ) {
    const propName: string = props.order[i] || Object.keys(props.data)[i];

    leftCol.push(
      <Row>
        <Col style={{ flex: 1,alignItems:'flex-start'}}>
          <Text>{props.data[propName].label}: </Text>
        </Col>
        <Col style={{ flex: 1 ,alignItems:'flex-start'}}>
          <Text note>{props.data[propName].value}</Text>
        </Col>
      </Row>
    );
  }

  return (
    <Card>
      <CardItem>
        <RightElements>
          <Grid>
            <Col style={{flex:2}}>{leftCol}</Col>
            <Col style={{flex:1,justifyContent:'center'}}>
              {!props.hideBeginButton ? (
                <Button small  onPress={navigateToTask}  bordered info>
                  <Text>
                    {FormTypeToName[props.formType?.toString() || "1"]}
                  </Text>
                </Button>
              ) : null}
            </Col>
          </Grid>
        </RightElements>
      </CardItem>
      <CardItem>
        <Right></Right>
        <Body></Body>
        <Left></Left>
      </CardItem>
    </Card>
  );
};

export default TaskSummary;

const styles = StyleSheet.create({});
