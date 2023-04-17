import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { GalUl } from './ImageGallery.styled';

export default function ImageGallery({ pictures }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');

  // обробка кліку по картинці, по id
  const onImgClick = e => {
    const imgId = e.target.id;
    const index = pictures.findIndex(
      picture => Number(picture.id) === Number(imgId)
    );
    const bigImgSize = pictures[index].largeImageURL;
    setLargeImgURL(bigImgSize);
    setShowModal(true);
  };

  // зміна стану модального вікна
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <Modal largeImageURL={largeImgURL} onClose={toggleModal} />}
      <GalUl onClick={e => onImgClick(e)}>
        {pictures.map(picture => {
          return (
            <ImageGalleryItem
              key={picture.id}
              webformatURL={picture.webformatURL}
              id={picture.id}
            />
          );
        })}
      </GalUl>
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};
