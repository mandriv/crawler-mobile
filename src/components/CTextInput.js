import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

import { transparent, white, whiteTransparent, cinnabar } from '../config/colours';
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
      <View style={getContainerStyle(this.props)}>
        {this.props.iconName &&
          <Icon
            style={getIconStyle(this.props)}
            name={this.props.iconName}
          />
        }
        <TextInput
          style={getTextInputStyle(this.props)}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          selectionColor={whiteTransparent(0.6)}
          placeholderTextColor={this.props.error ? cinnabar : whiteTransparent(0.6)}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={this.props.onSubmitEditing}
          value={this.props.value !== false ? this.props.value : this.state.text}
          onChangeText={(text) => {
            this.setState({ text });
            this.props.onChangeText(text);
          }}
          ref={input => this.props.inputRef(input)}
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
  errorContainer: {
    borderColor: cinnabar,
  },
  icon: {
    backgroundColor: transparent,
    fontSize: 25,
    color: white,
    lineHeight: 40,
  },
  errorColor: {
    color: cinnabar,
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

const getContainerStyle = (props) => {
  const { error } = props;
  const { container, errorContainer } = styles;
  return error ? StyleSheet.flatten([container, errorContainer]) : container;
}

const getTextInputStyle = (props) => {
  const { error } = props;
  const { textInput, errorColor } = styles;
  return error ? StyleSheet.flatten([textInput, errorColor]) : textInput;
}

const getIconStyle = (props) => {
  const { error } = props;
  const { icon, errorColor } = styles;
  return error ? StyleSheet.flatten([icon, errorColor]) : icon;
}

CTextInput.propTypes = {
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  iconName: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChangeText: PropTypes.func,
  // custom
  inputRef: PropTypes.func,
  error: PropTypes.bool,
};

CTextInput.defaultProps = {
  autoCorrect: true,
  autoCapitalize: 'sentences',
  keyboardType: 'default',
  returnKeyType: 'done',
  placeholder: '',
  secureTextEntry: false,
  iconName: '',
  onSubmitEditing: () => null,
  value: false,
  onChangeText: () => null,
  // custom
  inputRef: () => null,
  error: false,
};
