import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Flex, Box } from 'grid-styled';

import { postsRequest } from '../../../ducks/posts';

import Post from './Post/Post';

const PostsLayout = styled(Flex).attrs({
  justify: 'space-between'
})`
  margin-top: 45px;
  width: 100%;
`;

const PostsBox = styled(Box)`
  width: calc(100% - 315px);
  margin-right: 35px;

  ${media.lessThan('medium')`
    width: 100%;
    margin-right: 0;
  `};
`;

const NonePostsMessage = styled(Box)`
  font-size: 20px;
  color: #c3c3c3;
`;

const FiltersBox = styled(Box)`
  border: 1px solid rgba(151, 151, 151, 0.24);
  border-radius: 6px;
  flex-basis: 280px;
  flex-shrink: 0;
  height: 500px;
  padding: 25px 18px;

  ${media.lessThan('medium')`
    display: none;
  `};
`;

class Posts extends Component {
  static propTypes = {
    postsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.postsRequest();
  }

  renderPosts = () => {
    const { postsIds } = this.props;

    if (!postsIds.length) {
      return (
        <NonePostsMessage className="posts__empty-message">
          А объявлений еще нет, будь первым!
        </NonePostsMessage>
      );
    }

    return postsIds.map(id => <Post key={id} id={id} />);
  };

  render() {
    return (
      <PostsLayout>
        <PostsBox>{this.renderPosts()}</PostsBox>

        <FiltersBox>place for filters</FiltersBox>
      </PostsLayout>
    );
  }
}

export default connect(
  state => ({
    postsIds: state.posts.postsIds,
    loaded: state.posts.loaded,
    loading: state.posts.loading,
    error: state.posts.error
  }),
  { postsRequest }
)(Posts);
