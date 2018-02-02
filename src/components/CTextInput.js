import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

import { transparent, white, whiteTransparent } from '../config/colours';
import { primary } from '../config/fonts';

/*
  CTextInput container
*/

export default class CTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.iconName && <Icon style={styles.icon} name={this.props.iconName} />}
        <TextInput
          style={styles.textInput}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          selectionColor={whiteTransparent(0.6)}
          placeholderTextColor={whiteTransparent(0.6)}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.secureTextEntry}
          value={this.props.value !== false ? this.props.value : this.state.text}
          onChangeText={(text) => {
            this.setState({ text });
            this.props.onChangeText(text);
          }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: whiteTransparent(0.6),
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
  },
  icon: {
    backgroundColor: transparent,
    fontSize: 25,
    color: white,
    lineHeight: 40,
  },
  textInput: {
    height: 40,
    width: '90%',
    padding: 10,
    fontFamily: primary,
    fontSize: 13,
    color: white,
  },
});

CTextInput.propTypes = {
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  iconName: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChangeText: PropTypes.func,
};

CTextInput.defaultProps = {
  autoCorrect: true,
  autoCapitalize: 'sentences',
  keyboardType: 'default',
  returnKeyType: 'done',
  placeholder: '',
  secureTextEntry: false,
  iconName: '',
  value: false,
  onChangeText: () => null,
};
