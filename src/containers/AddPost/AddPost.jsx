import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Flex, Box } from 'grid-styled';
import Modal from '../../units/Modal/Modal';

class AddPost extends Component {
  render() {
    const { history } = this.props;
    return (
      <Modal history={history}>
        <Box>window</Box>
      </Modal>
    );
  }
}

export default AddPost;
