import React, { Component } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

import { RootNavigator } from '../config/router';

/*
  Root container
*/

export default class Root extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <RootNavigator />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
