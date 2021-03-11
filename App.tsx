import 'reflect-metadata';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import HomeScreen from './screens/HomeScreen';
import { Provider, useSelector } from 'react-redux';
import FormStore from './store/Stores/FormStore';
import { initApp,  getForms } from './init';

export default function App() {
  useEffect(() => {
    initApp().then(() => {
    });

  }, [])
  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  });

  if (loaded)

    return (
      <Provider store={FormStore}>
        <HomeScreen />
      </Provider>
    );

  else
    return <AppLoading />
}

