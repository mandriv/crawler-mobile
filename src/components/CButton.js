import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

import { transparent, white, whiteTransparent } from '../config/colours';
import { primary } from '../config/fonts';

/*
  CButton container
*/

export default class CButton extends Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparent,
    borderWidth: 1,
    borderColor: whiteTransparent(0.6),
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: primary,
    fontSize: 15,
    color: white,
  },
});

CButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

CButton.defaultProps = {
  onPress: () => null,
};
