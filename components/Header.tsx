import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Body, Button, Header as BaseHeader, Icon, Right, Title } from 'native-base'
interface Props {
    title: string,
    toggleButton: any
}
/**
 * App header component 
 * @param props contains the title and toggle button function to show or hide the side nav bar 
 * @returns 
 */
const Header = (props: Props) => {
    return (
        <View>
            <BaseHeader>
                {Platform.OS === "ios" ?
                    <Right></Right> : null

                }
                <Body style={styles.root}>
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

const styles = StyleSheet.create({
    root: {
        padding: 15
    }
})
