import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, I18nManager } from 'react-native';

import HomeScreen from './screens/HomeScreen';

 I18nManager.forceRTL(true);
 
export default function App() {

  return (
    <HomeScreen />
  );
}

