import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Box } from 'grid-styled';
import MaskedInput from 'react-text-mask';

import { getMasksProps } from '../../utils/formUtils';

const InputBox = styled(Box)`
  width: 100%;
`;

const Label = styled(Box)`
  font-size: 15px;
  letter-spacing: 1px;
  color: #231d1d;
  margin-bottom: 7px;
`;

const ErrorContainer = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`;

const InputStyles = css`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  line-height: 36px;
  border: 1px solid #e6e3e3;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const InputMaskElement = styled(MaskedInput)`
  ${InputStyles};
`;

const InputElement = styled.input`
  ${InputStyles};
`;

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    styles: PropTypes.object
  };

  static defaultProps = {
    value: '',
    error: null,
    type: 'text',
    styles: {
      mb: '20px'
    }
  };

  render() {
    const { name, label, value, type, onChange, styles, error } = this.props;

    const inputProps = {
      name,
      value,
      type,
      onChange
    };

    // Type of input component depends on its type
    const InputComponent = type === 'phone' ? InputMaskElement : InputElement;

    return (
      <InputBox {...styles}>
        <Label>{label}</Label>
        <InputComponent {...getMasksProps(type)} {...inputProps} />

        {error && <ErrorContainer>{error}</ErrorContainer>}
      </InputBox>
    );
  }
}

export default Input;
