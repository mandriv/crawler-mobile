import { StackNavigator } from 'react-navigation';
// screens
import SplashScreen from '../containers/Splash';
import LoginScreen from '../containers/Login';


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
      gesturesEnabled: false,
    },
  },
});
