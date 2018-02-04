import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import { peterRiver, belizeHole, white, transparent } from '../config/colours';
import { primary } from '../config/fonts';
import Logo from '../components/Logo';
import CTextInput from '../components/CTextInput';
import CButton from '../components/CButton';

import { login } from '../actions/authentication';
import { resetAction } from '../config/router';

/*
  Login container
*/

class Login extends Component {

  state = {
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    loading: false,
  }

  signIn = async () => {
    const { email, password } = this.state;
    this.setState({
      emailError: false,
      passwordError: false,
    });
    // Local validation
    if (!email) {
      this.setState({ emailError: true });
      Toast.show('Enter your email address');
      return;
    }
    if (!password) {
      this.setState({ passwordError: true });
      Toast.show('Enter your password');
      return;
    }
    // API call
    try {
      this.setState({ loading: true });
      await this.props.login(email, password);
      this.setState({ loading: false });
      this.props.reset('Main');
    } catch (error) {
      // Server validation
      console.log(error);
      Toast.show(error);
      if (error.toLowerCase().includes('mail')) {
        this.setState({ emailError: true });
      }
      if (error.toLowerCase().includes('password')) {
        this.setState({ passwordError: true });
      }
      this.setState({ loading: false });
    }
  }

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
            <Logo />
          </View>
          <View style={[styles.container, styles.formContainer]}>
            <CTextInput
              iconName="at-sign"
              placeholder="Email address"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text, emailError: false })}
              error={this.state.emailError}
            />
            <CTextInput
              iconName="lock"
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry
              onSubmitEditing={() => this.signIn()}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text, passwordError: false })}
              inputRef={input => this.passwordInput = input} // eslint-disable-line
              error={this.state.passwordError}
            />
            <CButton
              text="sign in"
              onPress={() => this.signIn()}
              loading={this.state.loading}
            />
          </View>
          <View style={[styles.container, styles.registerContainer]}>
            <CButton
              text="register now"
              onPress={() => this.props.navigation.navigate('Registration')}
              inverted
              noBorder
            />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
  formContainer: {
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  registerContainer: {
    paddingHorizontal: '5%',
    justifyContent: 'flex-end',
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
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    reset: route => dispatch(resetAction(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
