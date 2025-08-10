import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../redux/commonSlice/commonSlice';

export default function DeleteConfirmSheet({ onConfirm, onCancel }) {
  const dispatch = useDispatch();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Delete item?</Text>
      <Text>Are you sure you want to delete this item?</Text>
      <Button
        title="Yes, Delete"
        onPress={() => {
          onConfirm?.();
          dispatch(closeBottomSheet());
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          onCancel?.();
          dispatch(closeBottomSheet());
        }}
      />
    </View>
  );
};