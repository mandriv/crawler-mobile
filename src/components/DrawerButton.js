import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { white } from '../config/colours';

/*
  Touchable Logo container
*/

export default class DrawerButton extends Component {

  render() {
    return (
      <TouchableOpacity onPress={() => {
        const { navigation } = this.props;
        if (window.drawerOpen) {
          navigation.navigate('DrawerClose');
        } else {
          navigation.navigate('DrawerOpen');
        }
      }}
      >
        <Icon name="menu" style={styles.icon} />
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  icon: {
    color: white,
    padding: 10,
    marginRight: 10,
    fontSize: 30,
  },
});

DrawerButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};
