import React, { Component } from 'react';

import { Box } from 'grid-styled';
import Modal from '../../components/units/Modal/Modal';

class SuccessPage extends Component {
  render() {
    const { history } = this.props;

    return (
      <Modal onClosePage="/" history={history}>
        <Box>Успешно!</Box>
      </Modal>
    );
  }
}

export default SuccessPage;
