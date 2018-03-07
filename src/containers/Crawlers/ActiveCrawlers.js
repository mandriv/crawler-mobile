import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Socket, {
  SOC_JOIN,
  SOC_JOIN_FAIL,
  SOC_ROOMS_LIST,
  SOC_REQUEST_ROOMS,
  SOC_REQUEST_ROOMS_FAIL,
  SOC_ROOMS_LIST_UPDATE,
} from '../../util/Socket';

/*
  ActiveCrawlers container
*/

class ActiveCrawlers extends Component {

  constructor() {
    super();
    this.state = {
      loadingRooms: true,
      rooms: [],
    };
    this.REFRESH_INTERVAL = 1000;
    this.socket = new Socket();
    this.socket.subscribeTo(SOC_JOIN_FAIL, (msg) => {
      console.log(msg);
      this.setState({ loadingRooms: false });
      Toast.show('Failed to connect with crawler!');
    });

    this.socket.subscribeTo(SOC_REQUEST_ROOMS_FAIL, (msg) => {
      console.log(msg);
      this.setState({ loadingRooms: false });
      Toast.show('Failed to fetch available crawlers!');
    });

    this.socket.subscribeTo(SOC_ROOMS_LIST, (rooms) => {
      this.setState({
        loadingRooms: false,
        rooms,
      });
    });

    this.socket.subscribeTo(SOC_ROOMS_LIST_UPDATE, () => {
      console.log('cache miss');
      this._requestRooms();
    })
  }

  componentDidMount() {
    this.socket.emitData(SOC_JOIN, this.props.user);
    this._requestRooms();
  }

  _requestRooms = () => this.socket.emit(SOC_REQUEST_ROOMS);

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text>ActiveCrawlers screen</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ActiveCrawlers.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCrawlers);
