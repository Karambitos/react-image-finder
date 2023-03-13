import { createPortal } from 'react-dom';
import { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const portalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };
  handlePressKey = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlePressKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePressKey);
  }

  render() {
    return createPortal(
      <div
        className={styles.overlay}
        onClick={e => {
          this.closeModalBackdrop(e);
        }}
      >
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      portalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
