import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

import { peterRiver, belizeHole, white, transparent } from '../config/colours';
import Logo from '../components/Logo';


/*
  Splash container
*/

class Splash extends Component {

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

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
