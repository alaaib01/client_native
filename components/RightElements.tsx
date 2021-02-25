import { Content } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    children?: React.ReactNode
}

const RightElements = ({ children }: Props) => {
    return (
        <Content contentContainerStyle={styles.root}>
            {children}
        </Content>
    )
}

export default RightElements

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        direction: 'rtl',
        padding: 15
    }
})
