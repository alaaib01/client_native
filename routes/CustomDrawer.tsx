import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { DrawerNavigationHelpers, DrawerDescriptorMap } from '@react-navigation/drawer/lib/typescript/src/types'
import { DrawerNavigationState } from '@react-navigation/native'
import { Text, Content, Badge } from 'native-base'
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import RightElements from '../components/FormComponents/General/RightElements'
import { useNetInfo } from '@react-native-community/netinfo';

interface Props {
    state: DrawerNavigationState<Record<string, object | undefined>>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
}

const CustomDrawer = (props: Props) => {
    const netInfo = useNetInfo();

    return (
        <DrawerContentScrollView {...props}>
            <Content style={styles.profile}>
                <Image source={require('../assets/avatar.png')} style={{ height: 200, width: null, flex: 1, }} />
                <RightElements>
                    <Text>שם משתמש</Text>
                    {
                        netInfo.isConnected ?
                            <Badge success>
                                <Text>מצב מקוון</Text>
                            </Badge> :
                            <Badge danger>
                                <Text>מצב לא מקוון</Text>
                            </Badge>
                    }
                </RightElements>
            </Content>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    profile: {

    }
})
