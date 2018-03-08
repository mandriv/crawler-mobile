import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Card } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import CButton from './CButton';
import { secondary } from '../config/fonts';
import { emerald, cinnabar, belizeHole } from '../config/colours';

/*
  RobotLiveItem container
*/

export default class RobotLiveItem extends Component {

  render() {
    return (
      <Container>
        <Content style={styles.root}>
          <Card>
            <View style={styles.container}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {this.props.robotName}
              </Text>
              <View style={styles.statusContainer}>
                <Icon
                  style={getIconStyle(this.props.status)}
                  name="circle"
                />
                <Text style={styles.statusText}>
                  {this.props.status}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <CButton
                  text="Control"
                  onPress={this.props.onControl}
                  disabled={this.props.status !== 'Ready'}
                />
              </View>
            </View>
          </Card>
        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  root: {
    padding: '2%',
  },
  container: {
    padding: '5%',
  },
  title: {
    fontFamily: secondary,
    fontSize: 15,
    fontWeight: '600',
  },
  statusContainer: {
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    paddingLeft: '2%',
    fontFamily: secondary,
    fontSize: 12,
    fontWeight: '200',
  },
  statusIcon: {
    fontSize: 12,
    color: belizeHole,
  },
  readyIcon: {
    color: emerald,
  },
  errorIcon: {
    color: cinnabar,
  },
  buttonContainer: {
    marginLeft: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

const getIconStyle = (status) => {
  const { statusIcon, readyIcon, errorIcon } = styles;
  switch (status) {
    case 'Ready': return StyleSheet.flatten([statusIcon, readyIcon]);
    case 'Investigating': return StyleSheet.flatten([statusIcon, errorIcon]);
    default: return statusIcon;
  }
};

RobotLiveItem.propTypes = {
  robotName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onControl: PropTypes.func,
};

RobotLiveItem.defaultProps = {
  onControl: () => null,
};
