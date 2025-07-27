import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../redux/commonSlice/commonSlice';
import DeleteConfirmSheet from '../Dummy/DeleteConfirmSheet';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const handleOpenBottomSheet = () => {
    dispatch(openBottomSheet({
      component: DeleteConfirmSheet,
      props: {
        onConfirm: () => {
          console.log('Item deleted!');
        },
        onCancel: () => {
          console.log('Delete canceled');
        },
      },
    }));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Delete Confirmation" onPress={handleOpenBottomSheet} />
    </View>
  );
}
