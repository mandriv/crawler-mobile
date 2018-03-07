import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

/*
  ManageCrawlers container
*/

class ManageCrawlers extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>ManageCrawlers screen</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ManageCrawlers.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCrawlers);
