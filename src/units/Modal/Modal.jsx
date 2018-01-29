import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import withCloseOnOutsideClick from '../../hocs/withCloseOnOutsideClick';

import { Flex, Box } from 'grid-styled';

const Overlay = styled(Flex).attrs({
  justify: 'center',
  align: 'center'
})`
  width: 100%;
  height: 100%;
  background: rgba(9, 9, 9, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`;

const PopupBox = styled(Box)`
  padding: 35px 40px;
  background: #fff;
  border-radius: 6px;
  width: 640px;
  max-width: 100%;
`;

const Popup = withCloseOnOutsideClick(PopupBox);

// add portal wrapper
class Modal extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
      .isRequired,
    history: PropTypes.object.isRequired,
    onClosePage: PropTypes.string
  };

  static defaultProps = {
    onClosePage: null
  };

  render() {
    const { children, onClosePage, history } = this.props;

    return (
      <Overlay>
        <Popup onClosePage={onClosePage} history={history}>
          {children}
        </Popup>
      </Overlay>
    );
  }
}

export default Modal;
