import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from '../myDrawer/MyDrawer';
import MyBottomTabs from '../myBottomTab/MyBottomTabs';
import { navigationRef } from '../../utility/NavigationService';
import SettingsScreen from '../../screens/unAuthScreens/settings/SettingsScreen';
import { useSelector } from 'react-redux';
import LoginScreen from '../../screens/authScreen/loginScreen/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function RootNavigator({ onNavigationStateChange }) {

  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
      ref={navigationRef}
    >
      {
        userLoggedIn ? (
          <Drawer.Navigator
        initialRouteName="MainTabs"
        drawerContent={(props) => <MyDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
          drawerActiveTintColor: '#e91e63',
          drawerInactiveTintColor: '#000',
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen name="MainTabs" component={MyBottomTabs} options={{ title: 'Home' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Home' }} />
      </Drawer.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
};