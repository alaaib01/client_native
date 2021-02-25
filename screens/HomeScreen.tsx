import React from "react";

import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import RadioGroup from "../components/RadioGroup";
import Dropdown from "../components/Dropdown";

interface IProps {

}

const HomeScreen = (props: IProps) => {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>HomeScreen</Title>
                </Body>
                <Right />
            </Header>
            <Content >
                <RadioGroup key={'question1'} title={'שאלה שאלה'} subText={'test sub texta'} helperText={'asdjlkj aklsjdlkaj sdlkja slkd j'} childComponents={[{ key: "asd", defualt: true, component: <Text>Test 1</Text>, text: "test" }, { key: "asd2", component: <Text>Test 2</Text>, text: "test2" }]} />
                <Dropdown key={'question1'} title={'שאלה שאלה'} subText={'test sub texta'} helperText={'asdjlkj aklsjdlkaj sdlkja slkd j'} childComponents={[{ key: "asd", defualt: true, component: <Text>Test 1</Text>, text: "test" }, { key: "asd2", component: <Text>Test 2</Text>, text: "test2" }]} />
            </Content>
        </Container>
    );
}

export default HomeScreen