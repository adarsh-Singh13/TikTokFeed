import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../utility/Colors';
import HomeScreenBackground from '../../components/backroundScreen/HomeScreenBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/customHeader/CustomHeader';
import { toggleDrawer } from '../../redux/commonSlice/commonSlice';
import NavigationService from '../../utility/NavigationService';
import { Fonts } from '../../utility/Fonts';
import ExpandableThemeList from '../../components/expandableTheme/ExpandableThemeList';

const {HEIGHT, WIDTH} = Dimensions.get('window')

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.common.isDark);
  const isSystem = useSelector((state) => state.common.themeMode)
  
  const handlePressIcon = () => {
    console.log("pressed");
    dispatch(toggleDrawer());
    navigation.openDrawer()
  };

  return (
    <HomeScreenBackground mode={isDarkMode}>
      <SafeAreaView style={styles.mainContainer}>
        <CustomHeader
          userImage={false}
          headerText="Settings"
          headerStyle={styles.header}
          containerStyle={styles.headerContainer}
          onPersonIconPress={handlePressIcon}
        />
        <View style={styles.imageContainer}>
          <View style={styles.imagewrap}>
            <Image
              source={{
                uri: 'https://cloud-cube.s3.amazonaws.com/wr472o4ahbwb/public/788960_1753978193853image.png'
              }}
              resizeMode='cover'
              style={styles.image}
            />
          </View>
          <Text>Supertech 14th Avenue</Text>
        </View>
        <View style={styles.prefrence}>
          <Text style={styles.prfTxt}>Preferences</Text>
        </View>
        <View style={{flex: 1, top: 16}}>
        <ExpandableThemeList 
          mode={isDarkMode}
          system={isSystem}
        />
        </View>
      </SafeAreaView>
    </HomeScreenBackground>
  )
};

export default SettingsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    marginLeft: '28%',
  },
  headerContainer: {
    padding: 10,
    backgroundColor: 'transparent',
    alignContents: 'centre'
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  imagewrap: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    overflow: 'hidden'
  },
  image: {
    height: 100,
    width: 100,
  },
  prefrence: {
   left: 12,
   marginTop: 32,
  },
  prfTxt: {
    fontFamily: Fonts.fontMedium.font,
    fontWeight: Fonts.fontMedium.fontWeight
  },
})