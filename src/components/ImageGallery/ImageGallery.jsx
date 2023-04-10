import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { GalUl } from './ImageGallery.styled';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '33668245-88b2d78a431fcfde02e20361a';

export default function ImageGallery({ pictureFindName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [pictureFindName]);

  useEffect(() => {
    if (pictureFindName === '') {
      return;
    }

    setStatus('pending');

    async function foo() {
      try {
        const data = await fetchImages(pictureFindName, currentPage);
        if (data.totalHits === 0) {
          setPictures([]);
          setStatus('resolved');
          return toast.error(
            `Sorry, we didn't find picture including ${pictureFindName}`
          );
        }
        if (currentPage === 1) {
          setPictures(data.hits);
        } else {
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
        }
        if (data.totalHits < 12) {
          setStatus('idle');
          return toast.warn(
            `Sorry, picture including ${pictureFindName} ended :(`
          );
        }
        setStatus('resolved');
      } catch (error) {
        toast.error('Sorry, something wrong. Try again later');
      }
    }

    foo();

    return () => {
      console.log('return');
    };
  }, [pictureFindName, currentPage]);

  // запит картинок
  function fetchImages(query, page) {
    const data = fetch(
      `${API_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=12`
    ).then(res => res.json());
    return data;
  }

  // збільшуємо номер сторінки
  const onLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

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
      {status === 'pending' && currentPage === 1 && <Loader />}
      {showModal && <Modal largeImageURL={largeImgURL} onClose={toggleModal} />}
      {pictures.length > 0 && (
        <>
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
          {status === 'resolved' && <LoadMoreBtn onClick={onLoadMore} />}
          {status === 'pending' && <Loader />}
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  pictureFindName: PropTypes.string.isRequired,
};
