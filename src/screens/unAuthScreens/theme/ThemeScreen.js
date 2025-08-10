import React, { useEffect } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Colors from '../../../utility/Colors';
import Icon from '../../../components/customThemeIcon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../../../redux/commonSlice/commonSlice';

const ThemeScreen = () => {
  const { width: WIDTH } = useWindowDimensions();
  const dispatch = useDispatch();
  const themeSwitch = useSelector(state => state.common.themeMode);
  const isDark = useSelector(state => state.common.isDark);
 

  const SWITCH_CONTAINER_WIDTH = WIDTH * 0.8;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3;

  const translateX = useSharedValue(0);

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    if (themeSwitch === 'system') {
      translateX.value = withSpring(isDark ? SWITCH_WIDTH * 0 : SWITCH_WIDTH * 0);
    } else if (themeSwitch === 'light') {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (themeSwitch === 'dark') {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [themeSwitch, SWITCH_WIDTH]);

  const handleThemeChange = (theme) => {
    dispatch(setThemeMode(theme)); // ✅ Redux update
  };

  return (
    <View style={styles.container}>
      <Icon theme={isDark ? 'dark' : 'light'} />
      <View>
        <Text style={[styles.choseTxt, {color: isDark ? Colors.white: Colors.black }]}>Choose Your Theme Preference</Text>
        <Text style={[styles.DandN, {color: isDark ? Colors.white: Colors.black }]}>Day & Night</Text>
      </View>
      <View style={[styles.AnimatedBtncontainer, { width: SWITCH_CONTAINER_WIDTH }]}>
        <Animated.View
          style={[
            styles.slideContainers,
            translateAnimation,
            { width: SWITCH_WIDTH },
          ]}
        >
          <View style={[styles.slide, { width: (WIDTH * 0.7) / 3 }]} />
        </Animated.View>

        <Pressable onPress={() => handleThemeChange('system')} style={styles.button}>
          <Text style={styles.buttonText}>System</Text>
        </Pressable>
        <Pressable onPress={() => handleThemeChange('light')} style={styles.button}>
          <Text style={styles.buttonText}>Light</Text>
        </Pressable>
        <Pressable onPress={() => handleThemeChange('dark')} style={styles.button}>
          <Text style={styles.buttonText}>Dark</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ThemeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  AnimatedBtncontainer: {
    backgroundColor: Colors.lightGray,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  slideContainers: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  slide: {
    backgroundColor: Colors.white,
    padding: 23,
    borderRadius: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.black,
    fontWeight: '500',
  },
  choseTxt: {
      fontSize: 14,
      marginTop: 12,
      fontWeight: 'bold'
  },
  DandN: {
    alignSelf: 'center',
    fontSize: 12,
    // fontFamily: ''
  }
});