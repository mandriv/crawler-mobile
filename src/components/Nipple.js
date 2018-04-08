import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, PanResponder, Animated } from 'react-native';

import { peterRiver, belizeHole } from '../config/colours';

/*
  Nipple - joystick control
*/

const OUTER_R = 60;
const INNER_R = 30;
const INITIAL_TOP = OUTER_R - INNER_R;
const INITIAL_LEFT = OUTER_R - INNER_R;

const INITIAL_OPACITY = 0.5;
const FINAL_OPACITY = 0.8;
const TRANSITION_DURATION = 200; // ms

export default class Nipple extends Component {

  state = {
    opacity: new Animated.Value(INITIAL_OPACITY),
    nippleTop: INITIAL_TOP,
    nippleLeft: INITIAL_LEFT,
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => true,
      // Grant - start - change colours
      onPanResponderGrant: () => {
        Animated.timing(this.state.opacity, {
          toValue: FINAL_OPACITY,
          duration: TRANSITION_DURATION,
        }).start();
      },
      // Move - update position
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // 1. Get polar coords
        // First calculate distance (vector len)
        let mag = ((Math.abs(dx) ** 2) + (Math.abs(dy) ** 2)) ** 0.5;
        // If length is greater then radius, set it to radius val
        mag = mag > OUTER_R ? OUTER_R : mag;
        // Then calculate angle, we need cartesian coords for it
        const cartx = dx;
        const carty = -dy;
        const angleRad = Math.atan2(carty, cartx);
        // 2. Translate to cartesian
        const x = mag * Math.cos(angleRad);
        const y = mag * Math.sin(angleRad);
        // 3. Translate to dx, dy values
        const d2x = x;
        const d2y = -y;
        this.setState({
          nippleLeft: INITIAL_LEFT + d2x,
          nippleTop: INITIAL_TOP + d2y,
        });
        const power = Math.round((mag / OUTER_R) * 100);
        let theta = (angleRad * 180) / Math.PI;
        theta = theta >= 0 ? theta : 360 + theta;
        const angleDeg = Number.parseFloat(theta).toFixed(1);
        this.props.onChange({
          power,
          angle: Number(angleDeg),
        });
      },
      // Release
      onPanResponderRelease: () => {
        Animated.timing(this.state.opacity, {
          toValue: INITIAL_OPACITY,
          duration: TRANSITION_DURATION,
        }).start();
        this.setState({
          nippleLeft: INITIAL_LEFT,
          nippleTop: INITIAL_TOP,
        });
        this.props.onChange({
          power: 0,
          angle: 90,
        });
      },
      // Cancelled
      onPanResponderTerminate: () => {
        Animated.timing(this.state.opacity, {
          toValue: INITIAL_OPACITY,
          duration: TRANSITION_DURATION,
        }).start();
        this.setState({
          nippleLeft: INITIAL_LEFT,
          nippleTop: INITIAL_TOP,
        });
      },
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.outer, {
          opacity: this.state.opacity,
        }]}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.inner, {
            top: this.state.nippleTop,
            left: this.state.nippleLeft,
          }]}
        />
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  outer: {
    width: OUTER_R * 2,
    height: OUTER_R * 2,
    borderRadius: OUTER_R,
    backgroundColor: belizeHole,
  },
  inner: {
    position: 'relative',
    width: INNER_R * 2,
    height: INNER_R * 2,
    borderRadius: INNER_R,
    backgroundColor: peterRiver,
  },
});

Nipple.propTypes = {
  onChange: PropTypes.func,
};

Nipple.defaultProps = {
  onChange: () => null,
};
