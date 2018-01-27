import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import initStyles from './initStyles';

import Posts from '../containers/Posts/Posts';

initStyles();

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Posts />
      </Provider>
    );
  }
}

export default Application;
