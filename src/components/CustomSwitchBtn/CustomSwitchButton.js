import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Colors from '../../utility/Colors';

export default function CustomSwitchButton({ onPress, value, style }) {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const [displayedText, setDisplayedText] = useState(value ? 'ON' : 'OFF');

  useEffect(() => {
    // Animate circle movement
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // Animate text fade out → change text → fade in
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      setDisplayedText(value ? 'ON' : 'OFF');
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [value]);

  const circleTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 25], // slide the circle
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        value ? styles.containerOn : styles.containerOff,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Animated.Text style={[styles.text, 
      {textAlign: value ? 'left' : 'right',
        left: value ? 2 : -2,
      },
        { opacity: textOpacity }]}>
        {displayedText}
      </Animated.Text>

      {/* Circle absolutely positioned and animated */}
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ translateX: circleTranslateX }] },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 26,
    borderRadius: 20,
    paddingHorizontal: 4,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    position: 'relative',
  },
  containerOff: {
    backgroundColor: Colors.darkGray,
  },
  containerOn: {
    backgroundColor: '#4CAF50',
  },
  circle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    top: 3,
    left: 1,
    zIndex: 1,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 0,
    fontSize: 8,
  },
});
