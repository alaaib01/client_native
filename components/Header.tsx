import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Body, Button, Header as BaseHeader, Icon, Right, Title } from 'native-base'
interface Props {
    title: string,
    toggleButton: any
}

const Header = (props: Props) => {
    return (
        <View>
            <BaseHeader>
                <Right>

                </Right>
                <Body>
                    <Title>{props.title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={props.toggleButton}>
                        <Icon name="menu" />
                    </Button>
                </Right>
            </BaseHeader>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
