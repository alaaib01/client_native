import React from "react";

import { NavigationContainer, } from '@react-navigation/native';
import Header from '../components/Header';
import CustomDrawer from '../routes/CustomDrawer';
import { useSelector } from "react-redux";
import CalendarScreen from "./CalendarScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./LoginScreen";
import Form from "./FormScreen";
import Calender from "../components/Calender/Calender";
const Drawer = createDrawerNavigator();
interface IProps {

}

function HomeScreen2() {

    return <Calender />
  
  }
const HomeScreen = (props: IProps) => {
    const user = useSelector(state => state.user);
    if (user.username)
        return (
            <NavigationContainer>
                <Drawer.Navigator screenOptions={{
                    header: ({ scene }) => {
                        const { options } = scene.descriptor;
                        const title =
                            options.headerTitle !== undefined
                                ? options.headerTitle
                                : options.title !== undefined
                                    ? options.title
                                    : scene.route.name;

                        return (
                            <Header title={title.toString()} toggleButton={scene.descriptor.navigation.toggleDrawer} />
                        );
                    }
                }} drawerContent={props => <CustomDrawer {...props} />}>

                    <Drawer.Screen name="יומן" component={CalendarScreen} options={{ headerShown: true }} />
                    <Drawer.Screen name="משימה" component={Form} options={{ headerShown: true }} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    else
        return <LoginScreen />
}

export default HomeScreen