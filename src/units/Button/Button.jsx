import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Box } from 'grid-styled';

const disabledButtonStyles = css`
  background: #c8c8c8;
  cursor: default;

  &:hover {
    background: #c8c8c8;
  }
`;

const ButtonBox = styled(Box)`
  background: #15e1a9;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  height: 55px;
  line-height: 55px;
  padding: 0 50px;
  font-weight: 400;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: 0.4s ease;

  &:hover {
    background: #1ad3a0;
  }

  ${props => props.disabled && disabledButtonStyles};
`;

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    styles: PropTypes.object,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    styles: {},
    onClick: null
  };

  handleClick = e => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { styles, onClick, disabled } = this.props;

    return (
      <ButtonBox disabled={disabled} onClick={this.handleClick} {...styles}>
        {this.props.children}
      </ButtonBox>
    );
  }
}

export default Button;
