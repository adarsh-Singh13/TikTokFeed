import { createNavigationContainerRef, DrawerActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const NavigationService = {
  navigate(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },
  navigateDrawer(action) {
    if (navigationRef.isReady()) {
      if (action === 'open') {
        navigationRef.dispatch(DrawerActions.openDrawer());
      } else if (action === 'close') {
        navigationRef.dispatch(DrawerActions.closeDrawer());
      }
    }
  },
};

export default NavigationService;
