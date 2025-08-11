import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';

const iconType = {
    fa6: FontAwesome,
    ion: Ionicons,
    mdi: MaterialDesignIcons,
};

export default function GenericIcon({
    type = 'fa6',
    name,
    size,
    color,
    onPressIcon,
    style
}) {
    const IconComponent = iconType[type];
    if (!IconComponent) {
        console.warn(`Icon type "${type}" is not supported. Use "fa6", "ion", or "mdi".`);
        return null;
    };
    const iconElement = <IconComponent
        name={name}
        size={size}
        color={color}
        style={style}
    />;
    if (onPressIcon) {
        return (
            <TouchableOpacity onPress={onPressIcon} activeOpacity={0.7}>
                {iconElement}
            </TouchableOpacity>
        )
    }
    return iconElement;
};