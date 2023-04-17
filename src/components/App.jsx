import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Div } from './App.styled';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '33668245-88b2d78a431fcfde02e20361a';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');

  // передача значеннь під час сабміту форми
  const onFormSubmit = pictureName => {
    setCurrentPage(1);
    setPictureName(pictureName);
    setPictures([]);
  };

  useEffect(() => {
    if (pictureName === '') {
      return;
    }

    setStatus('pending');

    foo();

    async function foo() {
      try {
        const data = await fetchImages(pictureName, currentPage);
        if (data.totalHits === 0) {
          setPictures([]);
          setStatus('resolved');
          return toast.error(
            `Sorry, we didn't find picture including ${pictureName}`
          );
        }
        if (currentPage === 1) {
          setPictures(data.hits);
        } else {
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
        }

        if (data.hits.length < 12) {
          setStatus('idle');
          return toast.warn(`Sorry, picture including ${pictureName} ended :(`);
        }
        setStatus('resolved');
      } catch (error) {
        toast.error('Sorry, something wrong. Try again later');
      }
    }
  }, [pictureName, currentPage]);

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

  return (
    <Div>
      <ToastContainer autoClose={2500} />
      <Searchbar onSubmit={onFormSubmit} />
      {status === 'pending' && currentPage === 1 && <Loader />}
      {pictures.length > 0 && (
        <>
          <ImageGallery pictures={pictures} />
          {status === 'resolved' && <LoadMoreBtn onClick={onLoadMore} />}
          {status === 'pending' && <Loader />}
        </>
      )}
    </Div>
  );
}
