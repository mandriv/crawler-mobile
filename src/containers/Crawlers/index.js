import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs } from 'native-base';

import ActiveCrawlers from './ActiveCrawlers';
import ManageCrawlers from './ManageCrawlers';

/*
  Crawlers Description
*/

export default class Crawlers extends Component {

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Active">
            <ActiveCrawlers navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="All">
            <ManageCrawlers />
          </Tab>
        </Tabs>
      </Container>
    );
  }

}

Crawlers.propTypes = {
  navigation: PropTypes.object.isRequired,
};
