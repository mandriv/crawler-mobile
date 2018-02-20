import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Logo from './Logo';

/*
  Touchable Logo container
*/

export default class TouchableLogo extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Logo />
      </TouchableOpacity>
    );
  }

}

TouchableLogo.propTypes = {
  onPress: PropTypes.func.isRequired,
};
