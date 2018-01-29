import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store/store';
import initStyles from './initStyles';

import Posts from '../components/containers/Posts/Posts';
import Layout from '../components/units/Layout/Layout';
import Header from '../components/units/Header/Header';

import AddPostPage from '../pages/AddPostPage/AddPostPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import DeletePostPage from '../pages/DeletePostPage/DeletePostPage';
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
              <Route exact path="/delete/:id" component={DeletePostPage} />
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
