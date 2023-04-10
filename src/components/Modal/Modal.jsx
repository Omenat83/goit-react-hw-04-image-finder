import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { OverlayDiv, ModalDiv } from './Modal.styled';

export default function Modal({ largeImageURL, onClose }) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <OverlayDiv className="overlay" onClick={handleBackdropClick}>
      <ModalDiv className="modal">
        <img src={largeImageURL} alt="" />
      </ModalDiv>
    </OverlayDiv>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
