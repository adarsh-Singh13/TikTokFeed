import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../utility/Colors';

const GenericRadioButton = ({ label, selected, onPress, mode }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.radioCircle, {borderColor: mode ? Colors.white: Colors.primary}]}>
        {selected && <View style={[styles.selectedRb, {backgroundColor: mode? Colors.white: Colors.primary}]} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default GenericRadioButton;