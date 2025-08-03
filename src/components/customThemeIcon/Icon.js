import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, Mask } from '@shopify/react-native-skia'
import { useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Colors from '../../utility/Colors';


const RADIUS = 50;
const Icon = ({ theme }) => {
    const gradientColor1 = useSharedValue('#ff4467');
    const gradientColor2 = useSharedValue('#ff8e0b');
    const  cy = useSharedValue(0);
    const  mask = useSharedValue(0);

    const colors = useDerivedValue(() => {
        return [gradientColor1.value, gradientColor2.value]
    });

    // console.log("ssgsgsg", theme);

     useEffect(() => {
        if (theme === 'light') {
            cy.value = withTiming(0)
            mask.value = withTiming(0)
            gradientColor1.value = '#ff4467';
            gradientColor2.value = '#ff8e0b';
        } else {
            cy.value = withSpring(RADIUS / 2, {duration: 2000})
            mask.value = withSpring(RADIUS, {duration: 2000})
            gradientColor1.value = '#7da6ff';
            gradientColor2.value = '#5776f2';
        }
    }, [theme, mask, gradientColor1, gradientColor2]);


    return (
        <Canvas style={[styles.container, {transform: [ {rotate: Platform.OS == 'android' ? '25deg': '0deg'}]}]}>
            <Mask
                mode='luminance'
                mask={
                    <Group>
                        <Circle
                            color={Colors.white}
                            cx={RADIUS} 
                            cy={RADIUS} 
                            r={RADIUS}
                        />
                        <Circle 
                            color={Colors.black} 
                            cx={RADIUS} 
                            cy={cy} 
                            r={mask} 
                        />
                    </Group>
                }
            >
                <Circle cx={RADIUS} cy={RADIUS} r={RADIUS}>
                    <LinearGradient
                        colors={colors}
                        transform={[{rotate: -90}]}
                        origin={{x: RADIUS, y: RADIUS}}
                        start={{ x: 0, y: 0 }}
                        end={{ x: RADIUS * 2, y: RADIUS * 2 }}
                    />
                </Circle>
            </Mask>
        </Canvas>
    )
}

export default Icon

const styles = StyleSheet.create({
    container: {
        height: RADIUS * 2,
        width: RADIUS * 2,
    },
})