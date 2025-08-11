import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Colors from '../../utility/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomToastMessage({
    emojiFront,
    emojiBack,
    visible,
    message,
    position,
    duration,
    backgroundColorDynamic,
    onHide,
    mode,
}) {
    const insets = useSafeAreaInsets();
    const translateY = useSharedValue(position === 'top' ? -100 : 200);
    const opacity = useSharedValue(0);
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        let timer;
        if (visible) {
            setIsVisible(true);
            opacity.value = withTiming(1, { duration: 300 });
            translateY.value = withSpring(0, {
                damping: 15,
                stiffness: 150,
                mass: 1,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            });

            timer = setTimeout(() => {
                hideToast();
            }, duration);
        }
        return () => clearTimeout(timer);
    }, [visible]);

    const hideToast = () => {
        opacity.value = withSpring(0, { damping: 15, stiffness: 150 });
        translateY.value = withSpring(
            position === 'top' ? -100 : 200,
            { damping: 15, stiffness: 150 },
            () => {
                runOnJS(setIsVisible)(false);
                if (onHide) runOnJS(onHide)();
            }
        );
    };

    const animatedToastStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    if (!isVisible) return null;

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                position === 'top'
                    ? { top: insets.top + 20 }
                    : { bottom: insets.bottom + 70 },
                { backgroundColor: backgroundColorDynamic },
                animatedToastStyle,
            ]}
        >
            {emojiFront && <Text style={styles.emoji}>{emojiFront}</Text>}

            <View style={{ flexShrink: 1 }}>
                <Text
                    style={[
                        styles.toastMessage,
                        { color: mode ? Colors.primary : Colors.white }
                    ]}
                >
                    {message}
                </Text>
            </View>

            {emojiBack && <Text style={styles.emoji}>{emojiBack}</Text>}
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: SCREEN_WIDTH * 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.21,
        shadowRadius: 8.19,
        elevation: 11,
    },
    toastMessage: {
        fontSize: 16,
        flexWrap: 'wrap',   
    },
    emoji: {
        marginHorizontal: 4,
        fontSize: 18,
        left: -4,
    },
});
