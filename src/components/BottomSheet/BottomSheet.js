// BottomSheet.js
import React, { act, useCallback, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utility/Colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { closeBottomSheet } from '../../redux/commonSlice/commonSlice';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(({ close, theme }, ref) => {
  const dispatch = useDispatch();
  const { component: ContentComponent, props: contentProps } = useSelector(
    state => state.common.bottomSheetContent
  );
  
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, {
      damping: 20,
      stiffness: 90,
    });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  });

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

  const closeSheet = () => {
    close?.(); // from props
    dispatch(closeBottomSheet());
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      let nextTranslateY = event.translationY + context.value.y;
      translateY.value = Math.max(nextTranslateY, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      const draggedY = translateY.value;
      const thresholdToExpand = -SCREEN_HEIGHT * 0.70;

      if (draggedY > -SCREEN_HEIGHT / 3.5) {
        runOnJS(closeSheet)();
        scrollTo(0);
      } else if (draggedY < thresholdToExpand) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [28, 5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  const backgroundColor = theme ? Colors.black: Colors.white

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, bottomSheetStyle, {backgroundColor}]}>
        <View style={styles.line} />
        {ContentComponent && <ContentComponent {...contentProps} />}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    width: '100%',
    padding: 16,
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: Colors.darkGray || '#999',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  content: {
    textAlign: 'center',
    color: '#333',
  },
});

export default BottomSheet;
