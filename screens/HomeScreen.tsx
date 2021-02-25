import React from "react";

import { Content, Text } from "native-base";
import RadioGroup from "../components/RadioGroup";
import Dropdown from "../components/Dropdown";
import Form from "../components/Form";

interface IProps {

}

const HomeScreen = (props: IProps) => {
    return (
        <Content >
            <Form />
        </Content>
    );
}

export default HomeScreen