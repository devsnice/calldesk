import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import initStyles from './initStyles';

import Posts from '../containers/Posts/Posts';
import Layout from '../units/Layout/Layout';
import Header from '../units/Header/Header';

import AddPost from '../containers/AddPost/AddPost';

initStyles();

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Header />
            <Posts />

            <Switch>
              <Route path="/add" component={AddPost} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default Application;
