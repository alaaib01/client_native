import { Container, Content, H2, Header, Left, ListItem, Radio, Right, Text, H4, H3, Icon } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IBaseConditionalFormProps } from '../interfaces/BaseConditionalForm';
import RightElements from './RightElements';


interface Props extends IBaseConditionalFormProps {

}

const RadioGroup = (props: Props) => {
    const [selectedKey, setSelectedKey] = useState<String>('');
    const handleSelectionChanged = (val: string) => {
        setSelectedKey(val)
        if (props.setFormValue)
            props.setFormValue({ [props.key]: val })
    }
    return (

        <Content>
            <RightElements>
                <H2>{props.title}</H2>
                <H3>{props.subText}</H3>
            </RightElements>

            {props.childComponents?.map(child => {
                return <ListItem key={child.key} onPress={() => handleSelectionChanged(child.key)}>
                    <Left>
                        <Radio selected={selectedKey === child.key || (!!child.defualt && !selectedKey)} />
                    </Left>
                    <Right>
                        <Text>{child.text}</Text>
                    </Right>

                </ListItem>
            })}
            <RightElements>
                <Text>{props.helperText}</Text>
            </RightElements>
       
            <RightElements>
                {
                    props.childComponents?.find(child => child.key === selectedKey || (!!child.defualt && !selectedKey))?.component
                }
            </RightElements>
        </Content>


    )
}

export default RadioGroup

const styles = StyleSheet.create({})
