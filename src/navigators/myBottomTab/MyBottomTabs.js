import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Colors from '../../utility/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import HomeScreen from '../../screens/unAuthScreens/Home/HomeScreen';
import MyFeedScreen from '../../screens/unAuthScreens/feed/MyFeedScreen';
import CreateVideoScreen from '../../screens/unAuthScreens/createVideo/CreateVideoScreen';
import SearchScreen from '../../screens/unAuthScreens/search/SearchScreen';
import ProfileScreen from '../../screens/unAuthScreens/profile/ProfileScreen';

// *
// Custom Local Imports


const Tab = createBottomTabNavigator();

export default function MyBottomTabs() {
  const isDarkMode = useSelector((state) => state.common.isDark);

  const backgroundColor = isDarkMode ? Colors.black : Colors.white;
  const activeColor = isDarkMode ? Colors.primary : Colors.black;
  const inactiveColor = isDarkMode ? Colors.darkGray : Colors.darkGray;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={MyFeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="video" iconStyle="solid" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateVideoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="plus" iconStyle="solid" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="circle-user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
