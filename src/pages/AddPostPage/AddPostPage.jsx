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

  componentDidMount = () => {
    const { postsInitCreateForm } = this.props;

    postsInitCreateForm();
  };

  handleCreatePost = post => {
    const { postsAddRequest } = this.props;

    postsAddRequest(post);
  };

  render() {
    const { history, done } = this.props;

    return (
      <Modal history={history}>
        <PostEditor handleSubmit={this.handleCreatePost} />
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
