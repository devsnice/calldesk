import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Flex, Box } from 'grid-styled';
import Modal from '../../units/Modal/Modal';

import PostEditor from '../../containers/PostEditor/PostEditor';

import { postsInitCreateForm, postsAddRequest } from '../../ducks/posts';

class AddPostPage extends Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    postsInitCreateForm: PropTypes.func.isRequired,
    postsAddRequest: PropTypes.func.isRequired
  };

  handleCancel = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleCreatePost = post => {
    const { postsAddRequest } = this.props;

    postsAddRequest(post);
  };

  componentDidMount = () => {
    const { postsInitCreateForm } = this.props;

    postsInitCreateForm();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.done) {
      this.props.history.push('/success');
    }
  };

  render() {
    const { history, done } = this.props;

    return (
      <Modal history={history}>
        <PostEditor
          handleCancel={this.handleCancel}
          handleSubmit={this.handleCreatePost}
        />
      </Modal>
    );
  }
}

export default connect(
  state => ({
    ...state.posts.createForm
  }),
  { postsInitCreateForm, postsAddRequest }
)(AddPostPage);
