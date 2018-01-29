import React, { Component } from 'react';

import { Box } from 'grid-styled';
import Modal from '../../units/Modal/Modal';

class FailurePage extends Component {
  render() {
    const { history } = this.props;

    return (
      <Modal onClosePage="/" history={history}>
        <Box>Произошла ошибка</Box>
      </Modal>
    );
  }
}

export default FailurePage;
