import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { belizeHole } from '../config/colours';

/*
  Crawlers Description
*/

class Crawlers extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Control')} style={styles.button}>
          <Text>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 20,
    padding: 20,
    backgroundColor: belizeHole,
    borderRadius: 10,
  },
});

Crawlers.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Crawlers);
