import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grid-styled';

const TextareaBox = styled(Box)`
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

const TextareaElement = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 5px 10px;
  line-height: 18px;
  border: 1px solid #e6e3e3;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
`;

class Textarea extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    value: '',
    error: null
  };

  render() {
    const { name, label, value, onChange, error } = this.props;

    const textareaProps = {
      name,
      value,
      onChange
    };

    return (
      <TextareaBox mb="40px">
        <Label>{label}</Label>

        <TextareaElement {...textareaProps} />

        {error && <ErrorContainer>{error}</ErrorContainer>}
      </TextareaBox>
    );
  }
}

export default Textarea;
