import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../../screens/Search/SearchScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import MyFeedScreen from '../../screens/Feed/MyFeedScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import CreateVideoScreen from '../../screens/CreateVideo/CreateVideoScreen';

const Tab = createBottomTabNavigator();
export default function MyBottomTabs () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={MyFeedScreen} />
      <Tab.Screen name="Create" component={CreateVideoScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
};