import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import initStyles from './initStyles';

import Posts from '../containers/Posts/Posts';
import Layout from '../units/Layout/Layout';
import Header from '../units/Header/Header';

import AddPostPage from '../pages/AddPostPage/AddPostPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import SuccessPage from '../pages/SuccessPage/SuccessPage';
import FailurePage from '../pages/FailurePage/FailurePage';

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
              <Route path="/add" component={AddPostPage} />
              <Route exact path="/edit/:id" component={EditPostPage} />
              <Route path="/success" component={SuccessPage} />
              <Route path="/failure" component={FailurePage} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default Application;
