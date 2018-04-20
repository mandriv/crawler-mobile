import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import Orientation from 'react-native-orientation';
import RNFetchBlob from 'react-native-fetch-blob';

import { SOC_JOIN_ROOM } from '../util/Socket';
import ControlStateEmitter from '../util/ControlStateEmitter';
import Nipple from '../components/Nipple';

/*
  Control vehicle screen
*/

export default class Control extends Component {

  constructor(props) {
    super(props);
    this.socket = this.props.navigation.state.params.socket;
    this.roomName = this.props.navigation.state.params.roomName;
    this.robotID = this.props.navigation.state.params.robotID;
    this.socket.emitData(SOC_JOIN_ROOM, this.roomName);
    this.controlsEmitter = new ControlStateEmitter(this.socket);
    this.socket.emitData('video-stream-join', this.robotID);
    this.socket.subscribeTo('video-stream', (filename) => {
      this.update(filename);
    });
  }

  state = {
    uri: '',
  }

  componentDidMount() {
    this.controlsEmitter.startEmitting();
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    this.controlsEmitter.stopEmitting();
    Orientation.unlockAllOrientations();
  }

  update = async (filename) => {
    const url = `https://rc.overseer.ml/video-frame/${filename}`;
    try {
      const response = await RNFetchBlob.fetch('GET', url);
      this.setState({ uri: `data:image/jpeg;base64,${response.data}` });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { uri } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri }}
          style={styles.background}
        />
        <View style={styles.nipple}>
          <Nipple
            onChange={this.controlsEmitter.handleDataChange}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // height: '100%',
    // width: '100%',
  },
  nipple: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
});

Control.propTypes = {
  navigation: PropTypes.object.isRequired,
};
