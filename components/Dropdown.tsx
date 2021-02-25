import { Content, H2, H3, Icon, Picker } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IBaseConditionalFormProps } from '../interfaces/BaseConditionalForm'
import RightElements from './RightElements'

interface Props extends IBaseConditionalFormProps {

}

const Dropdown = (props: Props) => {
    const [electedValue, setSelectedValue] = useState('')
    return (
        <Content>
            <RightElements>
                <H2>{props.title}</H2>
                <H3>{props.subText}</H3>
            </RightElements>

            <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}

            >
                {props.childComponents?.map(child => {
                    return <Picker.Item key={child.key} label={child.text} value={child.key} />
                })}
                
            </Picker>
            <RightElements>
                <Text>{props.helperText}</Text>
            </RightElements>
        </Content>
    )
}

export default Dropdown

const styles = StyleSheet.create({})
