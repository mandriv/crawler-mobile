import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

import { authenticate, logout } from '../actions/authentication';
import { receiveUser } from '../actions/user';
import { peterRiver, belizeHole, white, transparent } from '../config/colours';
import Logo from '../components/Logo';


/*
  Splash container
*/

class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 4000);
  }

  init = async () => {
    /* eslint-disable */
    const {
      token,
      navigation,
      receiveUser,
      logout,
    } = this.props;
    /* eslint-enable */
    if (token) {
      try {
        const user = await authenticate(token);
        receiveUser(user);
        navigation.navigate('Main');
        return;
      } catch (error) {
        logout();
        navigation.navigate('Login');
        return;
      }
    }
    navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container} >
        <LinearGradient
          colors={[belizeHole, peterRiver]}
          style={styles.container}
        >
          <View style={[styles.container, styles.logoContainer, styles.centerize]}>
            <Logo />
          </View>
          <View style={[styles.container, styles.centerize]}>
            <View style={[styles.container, styles.centerize]}>
              <Text style={styles.header}>
                Crawler Mobile
              </Text>
            </View>
            <View style={[styles.container, styles.centerize]}>
              <Progress.Circle size={30} indeterminate color={white} />
            </View>
          </View>
          <View style={[styles.container, styles.bottomContainer]}>
            <Text style={styles.bottomText}>
              {'\u00A92018 Wojciech Cichoradzki'}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingVertical: 30,
  },
  centerize: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: transparent,
    color: white,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'VarelaRound-Regular',
  },
  bottomContainer: {
    backgroundColor: transparent,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomText: {
    backgroundColor: transparent,
    color: white,
    textAlign: 'center',
    fontFamily: 'VarelaRound-Regular',
  },
});

Splash.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    receiveUser: user => dispatch(receiveUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
