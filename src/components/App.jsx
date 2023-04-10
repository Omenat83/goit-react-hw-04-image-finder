import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Div } from './App.styled';

export default function App() {
  const [pictureName, setPictureName] = useState('');

  // передача значення інпуту з Searchbar під час сабміту форми
  const onFormSubmit = pictureName => {
    setPictureName(pictureName);
  };

  return (
    <Div>
      <ToastContainer autoClose={2500} />
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery pictureFindName={pictureName} />
    </Div>
  );
}
