import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openBottomSheet, toggleDrawer } from '../../../redux/commonSlice/commonSlice';
import HomeScreenBackground from '../../../components/backroundScreen/HomeScreenBackground';
import CustomHeader from '../../../components/customHeader/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeScreen from '../theme/ThemeScreen';
import NavigationService from '../../../utility/NavigationService';
import CustomToastMessage from '../../../components/customToast/CustomToastMessage';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.common.isDark);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const checkLoginToastStatus = async () => {
      if (isLoggedIn) {
        try {
          const alreadyShown = await AsyncStorage.getItem('hasShownLoginToast');
          if (alreadyShown) {
            setToastMessage( 'Welcome back!');
          } else {
            setToastMessage('🎉 Welcome! You are logged in successfully.');
            await AsyncStorage.setItem('hasShownLoginToast', 'true'); // ✅ Persist flag
          }
          setToastVisible(true);
        } catch (error) {
          console.error('Error checking login toast status:', error);
        }
      }
    };

    checkLoginToastStatus();
  }, [isLoggedIn]);

  const handlePressIcon = () => {
    console.log('pressed');
    dispatch(toggleDrawer());
    navigation.openDrawer();
  };

  const handleOpenBottomSheet = () => {
    dispatch(openBottomSheet({
      component: ThemeScreen,
    }));
  };

  const handleBellPress = () => {
    console.log('Bell pressed');
    setToastMessage('🔔 You have no new notifications!');
    setToastVisible(true);
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
          onBellPress={handleBellPress}
          onSettingsPress={() => NavigationService.navigate('Settings')}
          containerStyle={{ padding: 10, backgroundColor: 'transparent' }}
        />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Open Bottom Sheet" onPress={handleOpenBottomSheet} />
        </View>

        <CustomToastMessage
          visible={toastVisible}
          message={toastMessage}
          backgroundColorDynamic={isDarkMode ? '#3d3b3b' : '#4cd251'}
          position="bottom"
          duration={3000}
          onHide={() => setToastVisible(false)}
          mode={isDarkMode}
          emojiFront={'👋'}
        />

      </SafeAreaView>
    </HomeScreenBackground>
  );
}
