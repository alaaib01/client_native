import { useFonts } from 'expo-font';
import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './components/Header';
import CustomDrawer from './routes/CustomDrawer';

async () => {
  await I18nManager.allowRTL(true);
  await I18nManager.forceRTL(true);
}
const Drawer = createDrawerNavigator();


function HomeScreen2() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

    </View>
  );
}
export default function App() {

  const [loaded] = useFonts({

    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),

  });
  if (loaded)
    return (
      <NavigationContainer >
        <Drawer.Navigator  screenOptions={{
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

          <Drawer.Screen name="דף הבית" component={HomeScreen2} options={{ headerShown: true }} />
          <Drawer.Screen name="דף הבית2" component={HomeScreen} options={{ headerShown: true }} />


        </Drawer.Navigator>
      </NavigationContainer>
    );
  else
    return <AppLoading />
}

