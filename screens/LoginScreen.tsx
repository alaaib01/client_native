import React, { Component, useEffect, useState } from 'react';
import { Constants } from 'expo'
import { StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    View,
    Item,
    Icon,

} from 'native-base';
//@ts-ignore
import backGroundImage from '../assets/image.png'
//@ts-ignore
import appLogo from '../assets/icon.png'
import { useDispatch } from 'react-redux';
import STORE_CONSTS from '../store/Consts';
import { getValueFor, saveValue } from '../secureStorage/helpers';
import { COLORS } from '../constants/Colors';
interface Props {

}

const LoginScreen = (props: Props) => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        getValueFor('user').then(user => {
            dispatch({ type: STORE_CONSTS.USER.ACTIONS.LOGIN, payload: { ...user } })
        });

    }, [])
    
    const login = () => {
        {
            setLoading(false)
            saveValue('user', JSON.stringify({
                username: username,
                password: password,
                project: 2,
            })).then(() => {
                dispatch({ type: STORE_CONSTS.USER.ACTIONS.LOGIN, payload: { username: username, password: password } })
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })

        }
    }
    return (
        <Container >
            <Spinner
                visible={loading}
                textContent={'טוען'}
                textStyle={{ color: "#fff" }}
                overlayColor={"#5CD3AD9C"}
                size='large'
            />
            <ImageBackground source={backGroundImage} style={styles.image}>
                <View style={{ flex: 1, margin: '5%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={appLogo} style={styles.logo} />
                </View>
                <View style={{ flex: 1, margin: '5%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                    <Item rounded style={styles.inputContainer}>
                        <Icon style={styles.icon} active name='user' type={'FontAwesome5'} />
                        <Input style={styles.text} placeholder={"שם משתמש"} value={username} onChangeText={(txt) => setUsername(txt)}></Input>
                    </Item>
                    <Item rounded style={styles.inputContainer}>
                        <Icon style={styles.icon} active name='lock' type='FontAwesome5' />
                        <Input style={styles.text} placeholder={"סיסמה"} secureTextEntry={true} value={password} onChangeText={(txt) => setPassword(txt)} ></Input>
                    </Item>
                    <View style={{ padding: '5%', flexDirection: 'row', justifyContent: 'center' }}>

                        <Button bordered style={{ ...styles.btn }}>
                            <Text style={styles.btnTxt} onPress={login}>התחבר</Text>
                        </Button>

                        <Button bordered style={{ ...styles.btn, borderColor: '#FFCFCFDB', backgroundColor: '#FFCFCFDB' }}>
                            <Text style={styles.btnTxt}>שכחתי סיסמה</Text>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        </Container>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#FFFFFFDB',
        marginVertical: 10,
        color: '#fff',
        backgroundColor: '#FFFFFFDB'
    },
    icon: {

        marginStart: 17
    },
    text: {
        marginStart: 5,
        direction: 'rtl',
        textAlign: 'right',
        color: '#4f4e4e'
    },
    btn: {
        //borderRadius: 50,
        marginHorizontal: 4,
        backgroundColor: '#CFFFE4DB',
        width: '50%',
        textAlign: 'center',
        borderColor: '#CFFFE4DB',
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',

    },
    logo: {

        resizeMode: 'cover',
        justifyContent: 'center',
        maxHeight: 200,
        maxWidth: 200
    },
    btnTxt: {
        color: "#00000091",
        width: '100%',
        textAlign: 'center',
    },
})
