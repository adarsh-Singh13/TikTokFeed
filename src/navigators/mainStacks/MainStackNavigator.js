import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyBottomTabs from '../myBottomTab/MyBottomTabs';
import SettingsScreen from '../../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={MyBottomTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
