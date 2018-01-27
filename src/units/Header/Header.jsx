import React, { Component } from 'react';
import styled from 'styled-components';

import { Flex } from 'grid-styled';

import Button from '../Button/Button';

const Logotype = styled.div`
  font-size: 36px;
  line-height: 42px;
  font-weight: 600;
`;

const Controls = styled(Flex).attrs({
  align: 'center'
})``;

class Header extends Component {
  render() {
    return (
      <Flex justify="space-between">
        <Logotype>
          Доска <br />объявлений
        </Logotype>

        <Controls>
          <Button>Добавить</Button>
        </Controls>
      </Flex>
    );
  }
}

export default Header;