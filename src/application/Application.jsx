import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import initStyles from './initStyles';

import Posts from '../containers/Posts/Posts';
import Layout from '../units/Layout/Layout';
import Header from '../units/Header/Header';

initStyles();

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Header />
          <Posts />
        </Layout>
      </Provider>
    );
  }
}

export default Application;
