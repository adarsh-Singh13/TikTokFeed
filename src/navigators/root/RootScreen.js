import { View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import RootNavigator from './RootNavigator';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';

export default function RootScreen({ screenChanged }) {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const isBottomSheetOpen = useSelector(state => state.common.isBottomSheetOpen);
useEffect(() => {
  if (bottomSheetRef.current) {
    if (isBottomSheetOpen) {
      bottomSheetRef.current.scrollTo?.(-200); // open
    } else {
      bottomSheetRef.current.scrollTo?.(0); // close
    }
  }
}, [isBottomSheetOpen]);


  const onNavigationStateChange = (prevState) => {
    const currentRouteName = getActiveRouteName(prevState);
    screenChanged?.(currentRouteName);
  };

  const getActiveRouteName = (state) => {
    if (!state) return null;
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  return (
    <View style={{ flex: 1 }}>
      <RootNavigator onNavigationStateChange={onNavigationStateChange} />
      <BottomSheet ref={bottomSheetRef}/>
    </View>
  );
}
