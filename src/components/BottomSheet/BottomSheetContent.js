// components/BottomSheet/BottomSheetContent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheetService } from './BottomSheetService';
import { closeBottomSheet } from '../../redux/commonSlice/commonSlice';

export default function BottomSheetContent() {
  const dispatch = useDispatch();
  const { title, message, buttonText, onConfirm } = useSelector(
    state => state.common.bottomSheetContent
  );

  if (!title) return null;

  const handlePress = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(); // 🟢 your custom action
    }
    dispatch(closeBottomSheet());
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ marginVertical: 10 }}>{message}</Text>
      <Button title={buttonText || 'OK'} onPress={handlePress} />
    </View>
  );
}
