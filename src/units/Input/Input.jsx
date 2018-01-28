import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex, Box } from 'grid-styled';

const InputBox = styled(Box)`
  width: 100%;
`;

const Label = styled(Box)`
  font-size: 15px;
  letter-spacing: 1px;
  color: #231d1d;
  margin-bottom: 7px;
`;

const InputElem = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  line-height: 36px;
  border: 1px solid #e6e3e3;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    styles: PropTypes.object
  };

  static defaultProps = {
    value: '',
    styles: {
      mb: '20px'
    }
  };

  render() {
    const { name, label, value, styles } = this.props;

    const inputProps = {
      name,
      value
    };

    return (
      <InputBox {...styles}>
        <Label>{label}</Label>

        <InputElem {...inputProps} />
      </InputBox>
    );
  }
}

export default Input;
