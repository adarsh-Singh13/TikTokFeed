import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openBottomSheet, toggleDrawer } from '../../redux/commonSlice/commonSlice';
import HomeScreenBackground from '../../components/backroundScreen/HomeScreenBackground';
import CustomHeader from '../../components/customHeader/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeScreen from '../theme/ThemeScreen';
import NavigationService from '../../utility/NavigationService';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.common.isDark);

  const handlePressIcon = () => {
      console.log("pressed");
      dispatch(toggleDrawer());
      navigation.openDrawer()
    };

  return (
    <HomeScreenBackground mode={isDarkMode}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader
          userImage={false}
          headerText=""
          onPersonIconPress={handlePressIcon}
          showBell={true}
          showSettings={true}
          onBellPress={() => console.log('Bell pressed')}
          onSettingsPress={() => NavigationService.navigate('Settings')}
          containerStyle={{ padding: 10, backgroundColor: 'transparent' }}
        />
        
      </SafeAreaView>
    </HomeScreenBackground>
  );
};