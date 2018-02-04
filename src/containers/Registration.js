import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

import { peterRiver, belizeHole, white, transparent } from '../config/colours';
import { primary, secondary } from '../config/fonts';
import CTextInput from '../components/CTextInput';
import CButton from '../components/CButton';

import { register, login } from '../actions/authentication';
import { resetAction } from '../config/router';

/*
  Registration container
*/

class Registration extends Component {

  state = {
    name: {
      value: '',
      error: false,
    },
    email: {
      value: '',
      error: false,
    },
    password: {
      main: {
        value: '',
        error: false,
      },
      confirm: {
        value: '',
        error: false,
      },
    },
    loading: false,
  }

  resetErrors = () => {
    this.setState({
      name: {
        value: this.state.name.value,
        error: false,
      },
      email: {
        value: this.state.email.value,
        error: false,
      },
      password: {
        main: {
          value: this.state.password.main.value,
          error: false,
        },
        confirm: {
          value: this.state.password.confirm.value,
          error: false,
        },
      },
    });
  }

  register = async () => {
    this.setState({ loading: true });
    this.resetErrors();
    const { name, email, password } = this.state;
    // Local validation
    if (!name.value) {
      this.setState({
        name: {
          value: name.value,
          error: true,
        },
        loading: false,
      });
      return;
    }
    if (!email.value) {
      this.setState({
        email: {
          value: email.value,
          error: true,
        },
        loading: false,
      });
      return;
    }
    if (!password.main.value) {
      this.setState({
        password: {
          main: {
            value: password.main.value,
            error: true,
          },
          confirm: password.confirm,
        },
        loading: false,
      });
      return;
    }
    if (!password.confirm.value) {
      this.setState({
        password: {
          main: this.state.password.confirm,
          confirm: {
            value: this.state.password.confirm.value,
            error: true,
          },
        },
        loading: false,
      });
      return;
    }
    if (password.main.value !== password.confirm.value) {
      this.setState({
        password: {
          main: {
            value: this.state.password.main.value,
            error: true,
          },
          confirm: {
            value: this.state.password.confirm.value,
            error: true,
          },
        },
        loading: false,
      });
      return;
    }
    // all good, create a body
    const reqBody = {
      name: name.value,
      email: email.value,
      password: password.main.value,
    };
    try {
      await register(reqBody);
      await this.props.login(email.value, password.main.value);
      this.setState({ loading: false });
      this.props.reset('Main');
    } catch (error) {
      this.setState({ loading: false });
      Toast.show(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[belizeHole, peterRiver]}
          style={styles.container}
        >
          <View style={[styles.container, styles.root]}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={styles.closeIcon} name="x" />
              </TouchableOpacity>
            </View>
            <View style={[styles.headerContainer, styles.centerize]}>
              <Text style={styles.header}>
                Register
              </Text>
            </View>
            <View style={[styles.container, styles.formContainer]}>
              <CTextInput
                iconName="user"
                placeholder="Name"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => this.emailInput.focus()}
                value={this.state.name.value}
                error={this.state.name.error}
                onChangeText={text => this.setState({
                  name: {
                    value: text,
                    error: false,
                  },
                })}
              />
              <CTextInput
                iconName="at-sign"
                placeholder="Email Address"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                inputRef={input => this.emailInput = input} // eslint-disable-line
                value={this.state.email.value}
                error={this.state.email.error}
                onChangeText={text => this.setState({
                  email: {
                    value: text,
                    error: false,
                  },
                })}
              />
              <CTextInput
                iconName="lock"
                placeholder="Password"
                autoCorrect={false}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.secondPasswordInput.focus()}
                inputRef={input => this.passwordInput = input} // eslint-disable-line
                value={this.state.password.main.value}
                error={this.state.password.main.error}
                onChangeText={text => this.setState({
                  password: {
                    main: {
                      value: text,
                      error: false,
                    },
                    confirm: {
                      value: this.state.password.confirm.value,
                      error: false,
                    },
                  },
                })}
              />
              <CTextInput
                iconName="lock"
                placeholder="Confirm Password"
                autoCorrect={false}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="go"
                onSubmitEditing={() => this.register()}
                inputRef={input => this.secondPasswordInput = input} // eslint-disable-line
                value={this.state.password.confirm.value}
                error={this.state.password.confirm.error}
                onChangeText={text => this.setState({
                  password: {
                    main: {
                      value: this.state.password.main.value,
                      error: false,
                    },
                    confirm: {
                      value: text,
                      error: false,
                    },
                  },
                })}
              />
              <CButton
                text="Register"
                onPress={() => this.register()}
                loading={this.state.loading}
              />
            </View>
            <View style={[styles.container, styles.bottomContainer]}>
              <View style={styles.bottomRow}>
                <View style={[styles.container, styles.centerize]}>
                  <Text style={styles.bottomText}>
                    Already a member?
                  </Text>
                </View>
                <View style={[styles.container, styles.centerize]}>
                  <CButton
                    text="Login Now"
                    onPress={() => this.props.navigation.goBack()}
                    inverted
                    noBorder
                  />
                </View>
              </View>
            </View>
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
  closeContainer: {
    flexDirection: 'row',
    marginTop: '10%',
    backgroundColor: transparent,
  },
  closeIcon: {
    backgroundColor: transparent,
    fontSize: 25,
    color: white,
  },
  root: {
    paddingHorizontal: '5%',
  },
  headerContainer: {
    paddingBottom: '15%',
  },
  header: {
    backgroundColor: transparent,
    color: white,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: primary,
  },
  formContainer: {
    justifyContent: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
  },
  bottomText: {
    backgroundColor: transparent,
    color: white,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: secondary,
  },
  centerize: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});

Registration.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    reset: route => dispatch(resetAction(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
