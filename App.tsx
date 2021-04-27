import "reflect-metadata";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import FormStore from "./store/Stores/Store";
import { initApp } from "./init";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  useEffect(() => {
    initApp().then(() => {});
  }, []);
  const [loaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  if (loaded)
    return (
      <Provider store={FormStore}>
        <LoginScreen />
      </Provider>
    );
  else return <AppLoading />;
}
