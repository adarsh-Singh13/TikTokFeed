import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from './myDrawer/MyDrawer';
import MyBottomTabs from './myBottomTab/MyBottomTabs';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="MainTabs"
        drawerContent={props => <MyDrawer {...props} />}
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
        {/* 🟢 Only one screen inside Drawer: MyBottomTabs */}
        <Drawer.Screen name="MainTabs" component={MyBottomTabs} options={{ title: 'Home' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}