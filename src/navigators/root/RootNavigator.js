import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from '../myDrawer/MyDrawer';
import MyBottomTabs from '../myBottomTab/MyBottomTabs';
import { navigationRef } from '../../utility/NavigationService';
import SearchScreen from '../../screens/search/SearchScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function RootNavigator({ onNavigationStateChange }) {
  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
      ref={navigationRef}
    >
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
    </NavigationContainer>
  );
};