import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from './myDrawer/MyDrawer';
import MyBottomTabs from './myBottomTab/MyBottomTabs';
import MyFeedScreen from '../screens/Feed/MyFeedScreen';
import CreateVideoScreen from '../screens/CreateVideo/CreateVideoScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SearchScreen from '../screens/Search/SearchScreen';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
        <Drawer.Navigator 
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
            <Drawer.Screen name="Home" component={MyBottomTabs} />
            <Drawer.Screen name="Feed" component={MyFeedScreen} />
            {/* <Drawer.Screen name="Create" component={CreateVideoScreen} /> */}
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Search" component={SearchScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
};