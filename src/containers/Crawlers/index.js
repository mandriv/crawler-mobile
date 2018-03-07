import React, { Component } from 'react';
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
            <ActiveCrawlers />
          </Tab>
          <Tab heading="All">
            <ManageCrawlers />
          </Tab>
        </Tabs>
      </Container>
    );
  }

}
