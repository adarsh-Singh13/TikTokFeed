import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openBottomSheet } from '../../redux/commonSlice/commonSlice';
import HomeScreenBackground from '../../components/backroundScreen/HomeScreenBackground';
import CustomHeader from '../../components/customHeader/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeScreen from '../theme/ThemeScreen';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.common.isDark);


  const handleOpenBottomSheet = () => {
    dispatch(openBottomSheet({
      component: ThemeScreen,
    }));
  }
  return (
    <HomeScreenBackground mode={isDarkMode}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader
          userImage={false}
          headerText=""
          showBell={true}
          showSettings={true}
          onBellPress={() => console.log('Bell pressed')}
          onSettingsPress={() => console.log('Settings pressed')}
          containerStyle={{ padding: 10, backgroundColor: 'transparent' }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Open Bottom Sheet" onPress={handleOpenBottomSheet} />
        </View>
      </SafeAreaView>
    </HomeScreenBackground>
  );
};