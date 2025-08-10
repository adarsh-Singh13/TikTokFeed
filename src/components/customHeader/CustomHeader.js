import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import Colors from '../../utility/Colors';

const CustomHeader = ({
  userImage,
  headerText,
  showBell = false,
  showSettings = false,
  showFilter = false,
  onBellPress,
  onSettingsPress,
  onFilterPress,
  containerStyle,
  headerStyle,
  onPersonIconPress,
  mode
}) => {
  return (
    <View  style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        onPress={onPersonIconPress}
      >
      {userImage ? (
        <Image
          source={{ uri: userImage }}
          style={styles.userImage}
        />
      ) : (
        <View style={styles.userImagePlaceholder}>
          <Icon
            name="person-circle-outline"
            size={50}
            color={Colors.gray}
          />
        </View>
      )}
      </TouchableOpacity>

      {headerText ? (
        <Text style={[styles.headerText, headerStyle, {color: mode? Colors.white: Colors.black}]}>{headerText}</Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      <View style={styles.iconContainer}>
        {showFilter && (
          <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
            <Icon name="filter-outline" size={20} color={Colors.lightGray} />
          </TouchableOpacity>
        )}
        {showBell && (
          <TouchableOpacity onPress={onBellPress} style={styles.iconButton}>
            <Icon name="notifications-outline" size={20} color="#000" />
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
            <Icon name="settings-outline" size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: Colors.white,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: Colors.white,
    padding: 4,
    borderRadius: 20,
  },
});
