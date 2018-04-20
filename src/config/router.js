import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
// screens
import SplashScreen from '../containers/Splash';
import LoginScreen from '../containers/Login';
import RegistrationScreen from '../containers/Registration';
import DashboardScreen from '../containers/Dashboard';
import ControlScreen from '../containers/Control';
import CrawlersScreen from '../containers/Crawlers';
// components
import TouchableLogo from '../components/TouchableLogo';
import DrawerButton from '../components/DrawerButton';

import { primary } from './fonts';
import { belizeHole } from './colours';

// drawer
const MainDrawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard'.toUpperCase(),
      drawerIcon: ({ tintColor }) => (<Icon name="home" color={tintColor} size={25}/>), // eslint-disable-line
    },
  },
  Crawlers: {
    screen: CrawlersScreen,
    navigationOptions: {
      drawerLabel: 'Your Crawlers'.toUpperCase(),
      drawerIcon: ({ tintColor }) => (<IconMaterial name="steering" color={tintColor} size={25}/>), // eslint-disable-line
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
  Control: {
    screen: ControlScreen,
    navigationOptions: {
      header: false,
      gesturesEnabled: false,
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
