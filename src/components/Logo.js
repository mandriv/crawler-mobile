import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { transparent } from '../config/colours';

/*
  Logo container
*/

export default class Logo extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/img/logo/logo.png')}
          resizeMode="contain"
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparent,
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    height: '100%',
  },
});
