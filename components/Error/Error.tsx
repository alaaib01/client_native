import { Container, Content, Thumbnail, Text, Header, H3 } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../constants/Colors'


interface Props {

}

const Error = (props: Props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical:'50%'}}> 
            <Thumbnail square large source={require('../../assets/error.png')} />
            <H3 style={{ color: COLORS.main.WARNNING }}>משימה לא נמצאה</H3>
        </View>
    )
}

export default Error

