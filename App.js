// App.js or MainApp.js
import React, { useEffect } from 'react';
import { Appearance, StatusBar, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store/store';
import RootScreen from './src/navigators/root/RootScreen';
import { useSystemThemeSync } from './src/redux/systemUtilityHook/syncSystemTheme';
import { syncSystemTheme } from './src/redux/commonSlice/commonSlice';
import { darkTheme, lightTheme } from './src/utility/theme';


function MainApp() {
  useSystemThemeSync();

  // 🟢 Read theme from Redux
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.common.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const themeMode = useSelector(state => state.common.themeMode);
  useEffect(() => {
    dispatch(syncSystemTheme());
  }, []);


  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      dispatch(syncSystemTheme());
    });
    return () => subscription.remove();
  }, [dispatch, themeMode]);


  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <RootScreen />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
