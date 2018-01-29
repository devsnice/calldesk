import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Flex, Box } from 'grid-styled';

import image from './image.jpg';
import deleteControl from './delete.svg';
import editControl from './edit.svg';

import postStoreService from '../../../services/postsStoreService';

const PostBox = styled(Flex)`
  margin-bottom: 20px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(151, 151, 151, 0.29);
  overflow: hidden;
  justify: 'space-between';

  ${media.lessThan('small')`
    display: block;
    height: auto;
  `};
`;

const PostImage = styled.div`

  width: 275px;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;

  ${media.lessThan('small')`
    height: 120px;
    width: 100%
  `};
`;

const PostBody = styled(Box)`
  padding: 20px 25px 20px 20px;
  position: relative;
  width: calc(100% - 275px);

  ${media.lessThan('small')`
    width: 100%
  `};
`;

const PostData = styled(Box)`
  padding: 8px 0 18px 0;
  font-size: 16px;
  font-weight: 400;
  color: #5f5f5f;
`;

const PostControls = styled(Flex)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  line-height: 24px;
  width: 450px;
  max-width: 100%;
  font-weight: 600;
  word-wrap: break-word;
`;

const Description = styled.div`
  font-size: 15px;
  word-wrap: break-word;
`;

const Control = styled.div`
  margin-left: 16px;
  cursor: pointer;
`;

class Post extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string,
    phone: PropTypes.string,
    imgUrl: PropTypes.string
  };

  static defaultProps = {
    phone: null,
    city: null,
    imgUrl: null
  };

  render() {
    const { id, title, description, city, phone, imgUrl } = this.props;

    return (
      <PostBox>
        <PostImage image={image} />

        <PostBody>
          <Title>{title}</Title>

          <PostControls>
            <Link to={`/edit/${id}`}>
              <Control>
                <img src={editControl} />
              </Control>
            </Link>

            <Link to={`/delete/${id}`}>
              <Control onClick={this.handleDeletePost}>
                <img src={deleteControl} />
              </Control>
            </Link>
          </PostControls>

          <PostData>
            {city} {city && '|'} {phone}
          </PostData>

          <Description>{description}</Description>
        </PostBody>
      </PostBox>
    );
  }
}

export default connect((state, props) => ({
  ...state.posts.byId[props.id]
}))(Post);
