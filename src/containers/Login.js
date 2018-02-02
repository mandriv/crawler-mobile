import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { peterRiver, belizeHole, white, transparent } from '../config/colours';
import { primary } from '../config/fonts';
import Logo from '../components/Logo';
import CTextInput from '../components/CTextInput';
import CButton from '../components/CButton';


/*
  Splash container
*/

class Login extends Component {

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <LinearGradient
          colors={[belizeHole, peterRiver]}
          style={styles.container}
        >
          <View style={[styles.container, styles.logoContainer, styles.centerize]}>
            <Logo includeName />
          </View>
          <View style={[styles.formContainer]}>
            <CTextInput
              iconName="at-sign"
              placeholder="Email address"
            />
            <CTextInput
              iconName="lock"
              placeholder="Password"
            />
            <CButton
              text="sign in"
            />
          </View>
          <View style={[styles.formContainer]} />
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
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
    fontFamily: primary,
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
    fontFamily: primary,
  },
});

Login.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
