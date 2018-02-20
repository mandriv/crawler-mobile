import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
// screens
import SplashScreen from '../containers/Splash';
import LoginScreen from '../containers/Login';
import RegistrationScreen from '../containers/Registration';
import DashboardScreen from '../containers/Dashboard';
import ControlScreen from '../containers/Control';
// components
import TouchableLogo from '../components/TouchableLogo';
import DrawerButton from '../components/DrawerButton';

import { primary } from './fonts';
import { belizeHole } from './colours';

// resets stack
export const resetAction = route => NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: route })],
});

// drawer
const MainDrawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard'.toUpperCase(),
      drawerIcon: ({ tintColor }) => (<Icon name="home" color={tintColor} size={25}/>), // eslint-disable-line
    },
  },
  Control: {
    screen: ControlScreen,
    navigationOptions: {
      drawerLabel: 'Control'.toUpperCase(),
    },
  },
}, {
  contentOptions: {
    style: {
      marginVertical: 0,
    },
    labelStyle: {
      fontFamily: primary,
      fontSize: 15,
    },
  },
});

// main navigator
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
}, {
  initialRouteName: 'Splash',
  navigationOptions: ({ navigation }) => ({
    headerTitle: <TouchableLogo onPress={() => navigation.navigate('Dashboard')} />,
    headerStyle: { backgroundColor: belizeHole },
    headerLeft: <DrawerButton navigation={navigation} />,
  }),
});
