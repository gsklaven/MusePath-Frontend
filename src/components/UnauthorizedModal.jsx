import React from 'react';
import Modal from './Modal';


/**
 * Modal shown when user is unauthorized (401)
 */
const UnauthorizedModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Sign In Required">
    <div style={{ fontSize: 18, color: '#333', padding: '12px 0' }}>
      You need to sign in to use this feature.
    </div>
    <button
      style={{
        background: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 18px',
        fontSize: 16,
        marginTop: 16,
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      Go to Login Page
    </button>
  </Modal>
);

export default UnauthorizedModal;
