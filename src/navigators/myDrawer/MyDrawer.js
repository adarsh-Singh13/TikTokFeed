import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

export default function MyDrawer () {
    const navigation = useNavigation();
    const [isDark, setIsDark] = React.useState(false); 
    const toggleTheme = () => {
        setIsDark(!isDark);
        // Add logic to change the theme
        console.log('Theme toggled to:', !isDark ? 'Dark' : 'Light');
    };

  return (
    <DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My Drawer</Text>
      </View>
      <DrawerItem
        label="Home"
        onPress={() => console.log('Navigate to Home')}
      />
      <DrawerItem
        label="Feed"
        onPress={() => console.log('Navigate to Home')}
      />
      <DrawerItem
        label="Create"
        onPress={() => console.log('Navigate to Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => console.log('Navigate to Home')}
      />
    <View style={styles.switchContainer}>
        <Text>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      </DrawerContentScrollView> 
  )
};

const styles = StyleSheet.create({
    switchContainer: { 
        marginTop: 20,
        paddingHorizontal: 20 
    },
    drawerItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})