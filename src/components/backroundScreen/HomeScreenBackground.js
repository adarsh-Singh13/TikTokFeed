import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utility/Colors';

export default function HomeScreenBackground({ children, mode }) {

  const backgroundGradient = mode ? [Colors.gray, Colors.lightGray] : [Colors.secondary, '#faf9ff'];
  return (
    <LinearGradient
      colors={backgroundGradient} // top to bottom soft lavender gradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
