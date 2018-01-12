import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, StyleSheet } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import { RootNavigator } from '../config/router';

/*
  Root container
*/

class Root extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <RootNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
