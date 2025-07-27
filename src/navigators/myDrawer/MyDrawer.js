import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../../redux/commonSlice/themeSlice';
import Colors from '../../utility/Colors';
import CustomSwitchButton from '../../components/CustomSwitchBtn/CustomSwitchButton';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export default function MyDrawer(props) {
  const { state, navigation } = props;
  const isDarkMode = useSelector(state => state.theme.isDark);
  const dispatch = useDispatch();

  const toggleTheme = () => dispatch(toggleThemeAction());

  const backgroundColor = isDarkMode ? Colors.black : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const activeBgColor = isDarkMode ? Colors.primary : Colors.lightGray;

  const drawerItems = [
    { label: 'Home', route: 'Home', iconName: 'home' },
    { label: 'Feed', route: 'Feed', iconName: 'video' },
    // { label: 'Create', route: 'Create', iconName: 'plus' },
    { label: 'Search', route: 'Search', iconName: 'search' },
    { label: 'Profile', route: 'Profile', iconName: 'circle-user' },
  ];

  const currentTabRoute =
    state.routes[state.index]?.state?.routes?.[state.routes[state.index]?.state.index || 0]?.name;

  return (
    <DrawerContentScrollView style={{ backgroundColor }}>
      <View style={styles.drawerItemHeader}>
        <FontAwesome name="user-circle" size={50} color={textColor} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.name, { color: textColor }]}>Adarsh Singh</Text>
          <Text style={[styles.email, { color: textColor }]}>adarshsingh@gmail.com</Text>
        </View>
      </View>

      {drawerItems.map(item => {
        const isActive = currentTabRoute === item.route;

        return (
          <DrawerItem
            key={item.route}
            label={item.label}
            labelStyle={{ color: textColor }}
            icon={() =>
              item.iconName === 'home' || item.iconName === 'search' ? (
                <FontAwesome name={item.iconName} size={20} color={textColor} />
              ) : (
                <FontAwesome6 name={item.iconName} iconStyle="solid" size={20} color={textColor} />
              )
            }
            style={[
              styles.drawerItemContainer,
              isActive ? { backgroundColor: activeBgColor } : null,
            ]}
            onPress={() => navigation.navigate('MainTabs', { screen: item.route })}
            focused={isActive}
          />
        );
      })}

      <View style={styles.switchContainer}>
        <View style={{ flex: 1, top: 4 }}>
          <Text style={{ color: textColor }}>Dark Mode</Text>
        </View>
        <View style={styles.switchBtn}>
          <CustomSwitchButton value={isDarkMode} onPress={toggleTheme} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerItemHeader: {
    padding: 8,
    flexDirection: 'row',
    marginBottom: 80,
  },
  headerTextContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  drawerItemContainer: {
    borderRadius: 8,
    marginTop: 4,
    paddingHorizontal: 12,
  },
  switchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  switchBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 10,
  },
});
