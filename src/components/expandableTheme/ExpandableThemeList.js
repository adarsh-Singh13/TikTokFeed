import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../utility/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import GenericIcon from '@react-native-vector-icons/fontawesome';
import GenericRadioButton from './GenericRadioButton';
import LinearGradient from 'react-native-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Card_Height = SCREEN_HEIGHT * 0.07;

const ExpandableThemeList = ({ mode, system, onPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(system || 'system'); // default selection
  console.log(mode, "svss", system);
  
  const data = [
    { key: 'system', text: 'System' },
    { key: 'dark', text: 'Dark' },
    { key: 'light', text: 'Light' },
  ];

  const animatedHeight = useSharedValue(Card_Height);
  const headerTranslateY = useSharedValue(0);

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: withSpring(animatedHeight.value, {
      damping: 20,
      stiffness: 90,
    }),
  }));

  const headerAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(headerTranslateY.value, {
          damping: 20,
          stiffness: 90,
        }),
      },
    ],
  }));

  const toggleCard = () => {
    const toHeight = !isExpanded ? Card_Height + 140 : Card_Height;
    const toTranslateY = !isExpanded ? -Card_Height / 4 : 0;

    animatedHeight.value = toHeight;
    headerTranslateY.value = toTranslateY;
    setIsExpanded(prev => !prev);
  };

  // Set gradient colors based on the 'mode' prop
  const backgroundGradient = mode
    ? [Colors.gray, Colors.lightGray]
    : [Colors.secondary, '#faf9ff',];


  return (
    <TouchableWithoutFeedback onPress={toggleCard}>
      <LinearGradient
        colors={backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 4, y: 0 }}
        style={styles.gradient}
      >
        <Animated.View style={[styles.card, animatedHeightStyle]}>
          <Animated.View style={[styles.container, headerAnimationStyle]}>
            <Text style={styles.text}>{'Theme'}</Text>
            <GenericIcon
              name={isExpanded ? 'caret-up' : 'caret-down'}
              size={24}
              color={Colors.primaryText}
            />
          </Animated.View>

          {isExpanded && (
            <View style={styles.innerList}>
              {data.map((item) => (
                <View
                  key={item.key}
                  style={styles.dataConatiner}
                >
                  <Text style={styles.optionText}>{item.text}</Text>
                  <TouchableOpacity>
                    <GenericRadioButton
                      onPress={onPress}
                      selected={selected}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ExpandableThemeList;

const styles = StyleSheet.create({
  card: {
    width: '98%',
    // backgroundColor: Colors.gray,
    borderRadius: 12,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    opacity: 1,
    alignSelf: 'center',
    overflow: 'hidden',
  },
   gradient: {
    borderRadius: 12,
    width: '96%',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 22,
  },
  text: {
    color: Colors.primaryText,
    fontSize: 16,
    fontWeight: '500',
  },
  innerList: {
    paddingHorizontal: 12,
    paddingBottom: 2,
    left: 2,
    top: -14
  },
  dataConatiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.gray,
    marginTop: 6,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 0.3,
    borderRadius: 12,
    alignItems: 'center',
  },
  itemtcontainer: {
    gap: 12
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12
  },
});
