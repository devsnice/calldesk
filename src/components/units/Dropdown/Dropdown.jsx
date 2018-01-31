import { Dropdown } from 'semantic-ui-react';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grid-styled';

const DropdownBox = styled(Box)`
  width: 100%;
`;

const Label = styled(Box)`
  font-size: 15px;
  letter-spacing: 1px;
  color: #231d1d;
  margin-bottom: 7px;
`;

class Button extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ).isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    value: ''
  };

  handleChange = (e, data) => {
    this.props.onChange(this.props.name, data.value);
  };

  render() {
    const { items, value, label } = this.props;

    return (
      <DropdownBox>
        <Label>{label}</Label>

        <Dropdown
          search
          selection
          options={items}
          onChange={this.handleChange}
          value={value}
        />
      </DropdownBox>
    );
  }
}

export default Button;
