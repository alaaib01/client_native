import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Grid, Col } from 'native-base';
import RightElements from '../FormComponents/General/RightElements';
import { ITaskSummaryData } from '../../interfaces/Tasks';
interface Props extends ITaskSummaryData {
}

const TaskSummary = (props: Props) => {
    const rightCol: JSX.Element[] = [];
    const leftCol: JSX.Element[] = [];
    for (let i = 0; i < props.order.length || i < Object.keys(props.data).length; i++) {
        const propName: string = props.order[i] || Object.keys(props.data)[i];
        if (!!(i % 2)) {
            leftCol.push(<CardItem>
                <RightElements>
                    <Text>{props.data[propName].label}</Text>
                    <Text note>{props.data[propName].value}</Text>
                </RightElements>
            </CardItem>)
        }
        else {
            rightCol.push(<CardItem>
                <RightElements>
                    <Text>{props.data[propName].label}</Text>
                    <Text note>{props.data[propName].value}</Text>
                </RightElements>
            </CardItem>)
        }
    }


    return (
        <Card>
            <Grid>
                <Col>
                    {rightCol}
                </Col>
                <Col>
                    {leftCol}  
                     <Button primary>
                        <Text>התחל</Text>
                        <Icon active name="arrow-circle-left" type="FontAwesome5" />
                    </Button>
                </Col>
            </Grid>
            <CardItem>
                <Right>

                </Right>
                <Body>

                </Body>
                <Left>
                 
                </Left>
            </CardItem>
        </Card>
    )
}

export default TaskSummary

const styles = StyleSheet.create({})
