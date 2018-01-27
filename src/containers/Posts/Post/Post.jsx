import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Flex, Box } from 'grid-styled';

import image from './image.jpg';

const PostBox = styled(Flex)`
  margin-bottom: 20px;
  width: 100%;
  height: 225px;
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
  height: 100%;
  flex-basis: 275px;
  flex-shrink: 0;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;

  ${media.lessThan('small')`
   height: 120px;
  `};
`;

const PostBody = styled(Box)`
  padding: 20px 25px 20px 20px;
`;

const PostData = styled(Box)`
  padding: 8px 0 18px 0;
  font-size: 16px;
  font-weight: 400;
  color: #5f5f5f;
`;

const Title = styled.h2`
  font-size: 18px;
  line-height: 24px;
  width: 450px;
  max-width: 100%;
  font-weight: 600;
`;

const Description = styled(Box)`
  font-size: 15px;
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
    const { title, description, city, phone, imgUrl } = this.props;

    return (
      <PostBox>
        <PostImage image={image} />
        <PostBody>
          <Title>{title}</Title>

          <PostData>
            {city} | {phone}
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
