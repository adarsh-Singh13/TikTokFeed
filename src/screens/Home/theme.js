// src/themes/themes.js
import { DefaultTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    // customize if needed
  },
};

export const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    // customize if needed
  },
};
