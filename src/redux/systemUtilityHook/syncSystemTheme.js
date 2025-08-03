import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { syncSystemTheme } from '../commonSlice/commonSlice';

export const useSystemThemeSync = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.common.themeMode);

  useEffect(() => {
    if (themeMode === 'system') {
      // Initial sync
      dispatch(syncSystemTheme());

      // Add system appearance listener
      const subscription = Appearance.addChangeListener(() => {
        dispatch(syncSystemTheme());
      });

      return () => {
        subscription.remove();
      };
    }
  }, [themeMode, dispatch]);
};
