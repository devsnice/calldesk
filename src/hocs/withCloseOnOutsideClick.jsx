import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { doesNodeContainClick } from '../utils/domUtils';

const withCloseOnOutsideClick = WrappedComponent => {
  return class ComponentWithCloseOnOutsideClick extends React.Component {
    componentDidMount() {
      this.attachHandlersOnOpen();
    }

    componentWillUnmount() {
      this.dettachHandlersOnClose();
    }

    attachHandlersOnOpen = () => {
      document.addEventListener('click', this.closeOnDocumentClick);
    };

    dettachHandlersOnClose = () => {
      document.removeEventListener('click', this.closeOnDocumentClick);
    };

    closeOnDocumentClick = e => {
      const { history, onClosePage } = this.props;

      if (doesNodeContainClick(this.ref, e)) return;

      // just implementation for our case
      if (onClosePage) {
        history.push(onClosePage);
      } else {
        history.goBack();
      }
    };

    handleRef = elem => (this.ref = elem);

    render() {
      const { ...restProps } = this.props;

      return (
        <div ref={this.handleRef}>
          <WrappedComponent {...restProps} />
        </div>
      );
    }
  };
};

export default withCloseOnOutsideClick;
