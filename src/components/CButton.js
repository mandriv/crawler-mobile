import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';

import { transparent, white, peterRiver } from '../config/colours';
import { secondary } from '../config/fonts';

/*
  CButton container
*/

export default class CButton extends Component {

  render() {
    return (
      <TouchableOpacity
        style={getContainerStyle(this.props)}
        onPress={this.props.onPress}
      >
        <View style={styles.textContainer}>
          {this.props.loading ?
            <Progress.Circle
              color={this.props.inverted ? white : peterRiver}
              size={15}
              indeterminate
            />
            :
            <Text style={getTextStyle(this.props)}>
              {this.props.text.toUpperCase()}
            </Text>
          }
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: white,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 10,
  },
  invertedContainer: {
    backgroundColor: transparent,
  },
  noBorderContainer: {
    borderColor: transparent,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: secondary,
    fontSize: 15,
    fontWeight: '900',
    color: peterRiver,
  },
  invertedText: {
    color: white,
  },
});

const getContainerStyle = (props) => {
  const { inverted, noBorder } = props;
  const {
    container,
    noBorderContainer,
    invertedContainer,
  } = styles;
  // Set container styling
  let containerStyle = container;
  /* eslint-disable */
  containerStyle = inverted ? StyleSheet.flatten([containerStyle, invertedContainer]) : containerStyle;
  containerStyle = noBorder ? StyleSheet.flatten([containerStyle, noBorderContainer]) : containerStyle;
  /* eslint-enable */
  return containerStyle;
};

const getTextStyle = (props) => {
  const { inverted } = props;
  const {
    text,
    invertedText,
  } = styles;
  // Set container styling
  let textStyle = text;
  /* eslint-disable */
  textStyle = inverted ? StyleSheet.flatten([textStyle, invertedText]) : textStyle;
  /* eslint-enable */
  return textStyle;
};

CButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  noBorder: PropTypes.bool, // eslint-disable-line
  inverted: PropTypes.bool, // eslint-disable-line
  loading: PropTypes.bool,
};

CButton.defaultProps = {
  onPress: () => null,
  noBorder: false,
  inverted: false,
  loading: false,
};
