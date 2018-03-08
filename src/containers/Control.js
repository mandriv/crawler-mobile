import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

import { SOC_JOIN_ROOM, SOC_CONTROLS } from '../util/Socket';
import Nipple from '../components/Nipple';

/*
  Control vehicle screen
*/

export default class Control extends Component {

  constructor(props) {
    super(props);
    this.socket = this.props.navigation.state.params.socket;
    this.roomName = this.props.navigation.state.params.roomName;
    this.socket.emitData(SOC_JOIN_ROOM, this.roomName);
  }

  state = {
    vidURL: 'https://abclive1-lh.akamaihd.net/i/abc_live10@420897/master.m3u8',
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: this.state.vidURL }}
          ref={(ref) => {
            this.player = ref;
          }}
          rate={1.0}
          volume={0.0}
          muted={false}
          paused={false}
          resizeMode="cover"
          repeat={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          progressUpdateInterval={250.0}
          onLoadStart={this.loadStart}
          onLoad={this.setDuration}
          onProgress={this.setTime}
          onEnd={this.onEnd}
          onError={this.videoError}
          onBuffer={this.onBuffer}
          onTimedMetadata={this.onTimedMetadata}
          style={styles.video}
        />
        <View style={styles.nipple}>
          <Nipple
            onChange={data => this.socket.emitData(SOC_CONTROLS, data)}
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
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
