import { Content, H2, H3, ListItem, Separator, Text } from 'native-base'
import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import RightElements from './RightElements'

interface Props {
    title?: string,
    subText?: string,
    helperText?: string,
    children: ReactNode,
    subChildren: ReactNode
}

const BaseFormComponent = (props: Props) => {

    return (
        <Content>
            <RightElements>
                {props.title ? <H2>{props.title}</H2> : null}
                {props.subText ? <H3>{props.subText}</H3> : null}
            </RightElements>
            {
                props.children
            }
            <RightElements>
                {props.helperText ? <Text>{props.helperText}</Text> : null}
            </RightElements>
            <ListItem itemDivider></ListItem>
            <Separator style={{ backgroundColor: 'transparent' }}>
            </Separator>
            {
                props.subChildren
            }
        </Content>
    )
}

export default BaseFormComponent

const styles = StyleSheet.create({})
