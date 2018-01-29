import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../units/Modal/Modal';

import PostEditor from '../../containers/PostEditor/PostEditor';

import { postsInitEditForm, postsEditRequest } from '../../ducks/posts';
import postStoreService from '../../services/postsStoreService';

class EditPostPage extends Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    postsInitEditForm: PropTypes.func.isRequired,
    postsEditRequest: PropTypes.func.isRequired
  };

  state = {
    post: null
  };

  handleEditPost = post => {
    const { postsEditRequest, match } = this.props;
    const postId = match.params.id;

    postsEditRequest(postId, post);
  };

  getEditPostById = () => {
    const { match } = this.props;
    const postId = match.params.id;
    const post = postStoreService.getById(postId);

    return post;
  };

  componentDidMount = () => {
    const { postsInitEditForm } = this.props;
    const post = this.getEditPostById();

    if (!post) {
      this.props.history.push('/failure');
    } else {
      this.setState({ post });
    }

    postsInitEditForm();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.done) {
      this.props.history.push('/success');
    }
  };

  render() {
    const { history } = this.props;

    if (this.state.post) {
      return (
        <Modal history={history}>
          <PostEditor
            post={this.state.post}
            handleSubmit={this.handleEditPost}
          />
        </Modal>
      );
    }

    return null;
  }
}

export default connect(
  state => ({
    ...state.posts.editForm
  }),
  { postsInitEditForm, postsEditRequest }
)(EditPostPage);