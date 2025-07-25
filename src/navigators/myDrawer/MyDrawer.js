import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CustomSwitchButton from '../../components/CustomSwitchBtn/CustomSwitchButton';

export default function MyDrawer() {
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
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Feed"
        onPress={() => navigation.navigate('Feed')}
      />
      <DrawerItem
        label="Create"
        onPress={() => navigation.navigate('Create')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={styles.switchContainer}>
      <View style={{ flex: 1,top: 4,}}>
        <Text>Dark Mode</Text>
      </View>
       <View style={{ flex: 1, alignItems: 'flex-end', }}>
        <CustomSwitchButton
          value={isDark}
          onPress={toggleTheme}
        />
      </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  drawerItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
