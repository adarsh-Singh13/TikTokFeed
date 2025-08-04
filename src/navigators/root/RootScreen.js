import { View, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import RootNavigator from './RootNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { closeBottomSheet } from '../../redux/commonSlice/commonSlice';
import BottomSheet from '../../components/BottomSheet/BottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RootScreen({ screenChanged }) {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const bottomSheetVisible = useSelector(state => state.common.isBottomSheetOpen);
  const bottomSheetContent = useSelector(state => state.common.bottomSheetContent);
  const bottomSheetHeading = useSelector(state => state.common.bottomSheetHeading);
  const bottomSheetDisabled = useSelector(state => state.common.bottomSheetDisabled);
  const isDark = useSelector(state => state.common.isDark);

  useEffect(() => {
    if (bottomSheetRef.current) {
      if (bottomSheetVisible) {
        bottomSheetRef.current.scrollTo?.(-SCREEN_HEIGHT / 3); // open
      } else {
        bottomSheetRef.current.scrollTo?.(0); // close
      }
    }
  }, [bottomSheetVisible]);

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
      <BottomSheet
        ref={bottomSheetRef}
        close={() => dispatch(closeBottomSheet())}
        visible={bottomSheetVisible}
        content={bottomSheetContent}
        heading={bottomSheetHeading}
        disabled={bottomSheetDisabled}
        theme= {isDark}
      />
    </View>
  );
};