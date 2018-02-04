import React from 'react';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
// screens
import SplashScreen from '../containers/Splash';
import LoginScreen from '../containers/Login';
import RegistrationScreen from '../containers/Registration';
import DashboardScreen from '../containers/Dashboard';

// resets stack
export const resetAction = route => NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: route })],
});

const MainDrawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard'.toUpperCase(),
      drawerIcon: ({ tintColor }) => (<Icon name="home" color={tintColor} size={25}/>), // eslint-disable-line
    },
  },
});

export const RootNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: false,
      title: 'Splash',
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: false,
      title: 'Login',
      gesturesEnabled: true,
    },
  },
  Registration: {
    screen: RegistrationScreen,
    navigationOptions: {
      header: false,
      title: 'Registration',
      gesturesEnabled: true,
    },
  },
  Main: {
    screen: MainDrawer,
  },
});
