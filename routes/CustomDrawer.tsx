import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState } from "@react-navigation/native";
import { Text, Content, Badge } from "native-base";
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import RightElements from "../components/FormComponents/General/RightElements";
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector } from "react-redux";

interface Props {
  state: DrawerNavigationState<Record<string, object | undefined>>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}
/**
 * custom side navbar , upper agent image , with agent name , network statuts and routes 
 * @param props 
 * @returns 
 */
const CustomDrawer = (props: Props) => {
  const netInfo = useNetInfo();
  const fullname = useSelector((state) => {
    return state.user.lastname || "" + " " + (state.user.firstname || "");
  });
  return (
    <DrawerContentScrollView {...props}>
      <Content style={styles.profile}>
        <Image
          square
          source={require("../assets/avatar.png")}
          style={{ height: 200, width: null, flex: 1 }}
        />
        <RightElements style={{ paddingRight: 25 }}>
          <View style={{ padding: 15 }}>
            <Text>{fullname}</Text>
          </View>
          <View style={{ padding: 15 }}>
            {netInfo.isConnected ? (
              <Badge success>
                <Text>מצב מקוון</Text>
              </Badge>
            ) : (
              <Badge danger>
                <Text>מצב לא מקוון</Text>
              </Badge>
            )}
          </View>
        </RightElements>
      </Content>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profile: {},
});
