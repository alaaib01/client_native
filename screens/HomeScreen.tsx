import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";
import CustomDrawer from "../routes/CustomDrawer";
import { useSelector } from "react-redux";
import CalendarScreen from "./CalendarScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./LoginScreen";
import Form from "./FormScreen";
import { getForms } from "../init";
import axios, { AxiosRequestConfig } from "axios";
import TabsScreen from "./TabsScreen";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "POST, GET, OPTIONS, PUT, DELETE";

const Drawer = createDrawerNavigator();
interface IProps {}

const HomeScreen = (props: IProps) => {
  const access_token = useSelector((state) => {
    return state.user.access_token;
  });
  useEffect(() => {
    if (access_token) {
      // Add a request interceptor to all axios request , adding the cureent access token
      axios.interceptors.request.use(function (config: AxiosRequestConfig) {
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
      });
      getForms();
    }
  }, [access_token]);

  // if access token exists go to home page else load login screen
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: ({ scene }) => {
            const { options } = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name;

            return (
              <Header
                title={title.toString()}
                toggleButton={scene.descriptor.navigation.toggleDrawer}
              />
            );
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="יומן"
          component={TabsScreen}
          options={{ headerShown: true }}
        />
        <Drawer.Screen
          name="משימה"
          component={Form}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
