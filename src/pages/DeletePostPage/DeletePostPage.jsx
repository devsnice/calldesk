import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Flex, Box } from 'grid-styled';

import Modal from '../../units/Modal/Modal';
import Button from '../../units/Button/Button';

import { postsInitDeleteForm, postsDeleteRequest } from '../../ducks/posts';
import postStoreService from '../../services/postsStoreService';

class DeletePostPage extends Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    postsInitDeleteForm: PropTypes.func.isRequired,
    postsDeleteRequest: PropTypes.func.isRequired
  };

  handleCancel = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleDeletePost = post => {
    const { postsDeleteRequest, match } = this.props;
    const postId = match.params.id;

    postsDeleteRequest(postId, post);
  };

  getDeletePostById = () => {
    const { match } = this.props;
    const postId = match.params.id;
    const post = postStoreService.getById(postId);

    return post;
  };

  componentDidMount = () => {
    const { postsInitDeleteForm, history } = this.props;
    const post = this.getDeletePostById();

    if (!post) {
      history.push('/failure');
    }

    postsInitDeleteForm();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.done) {
      this.props.history.push('/success');
    }
  };

  render() {
    const { history } = this.props;

    return (
      <Modal history={history}>
        <Flex align="center" column>
          <Box>Удалить объявление?</Box>

          <Flex mt="40px" width="300px" justify="space-between">
            <Button onClick={this.handleCancel}>Отмена</Button>
            <Button onClick={this.handleDeletePost}>Да</Button>
          </Flex>
        </Flex>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    ...state.posts.deleteForm
  }),
  { postsInitDeleteForm, postsDeleteRequest }
)(DeletePostPage);
