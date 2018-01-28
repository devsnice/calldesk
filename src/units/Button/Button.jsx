import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grid-styled';

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
`;

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    styles: PropTypes.object
  };

  static defaultProps = {
    styles: {}
  };

  render() {
    const { styles } = this.props;

    return <ButtonBox {...styles}>{this.props.children}</ButtonBox>;
  }
}

export default Button;
