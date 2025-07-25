import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../../screens/Search/SearchScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import MyFeedScreen from '../../screens/Feed/MyFeedScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import CreateVideoScreen from '../../screens/CreateVideo/CreateVideoScreen';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import EvilIcons from '@react-native-vector-icons/evil-icons';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const Tab = createBottomTabNavigator();
export default function MyBottomTabs () {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: true }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" iconStyle="solid" size={24} />
          ),
        }}/>
      <Tab.Screen name="Feed" component={MyFeedScreen} 
      options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name='video' iconStyle="solid" size={24} />
          ),
        }}/>
      <Tab.Screen name="Create" component={CreateVideoScreen} 
      options={{
          tabBarIcon: ({ color, size }) => (
           <FontAwesome6 name='plus' iconStyle="solid" size={24} />
          ),
        }}/>
      <Tab.Screen name="Search" component={SearchScreen}  options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='search' iconStyle="solid" size={24} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name='circle-user' iconStyle="solid" size={24} />
          ),
        }}/>
    </Tab.Navigator>
  )
};