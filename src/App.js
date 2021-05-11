import React, { useEffect, useState } from 'react';
import Searchbar from './Component/Searchbar';
import ImageGallery from './Component/ImageGallery';
import ImageGalleryItem from './Component/ImageGalleryItem';
import styles from './styles.module.css';
import Button from './Component/Button';
import { fetchImagesApi } from './Component/Services/images-api';
import Loader from './Component/Loader';
import Modal from './Component/Modal';
import axios from 'axios';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCcurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    setIsLoading(true);
    let source = axios.CancelToken.source();

    fetchImagesApi({ searchQuery, currentPage })
      .then(hits => {
        setImages(prevState => [...prevState, ...hits]);

        imagesSchrool();
      })
      .catch(error => setError(error))
      .finally(setIsLoading(false));
    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, [currentPage, searchQuery]);

  const imagesSchrool = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onChangeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setCcurrentPage(1);
    setError(null);
  };

  const closeToggleModal = () => {
    setShowModal(false);
  };

  const fetchClickImages = largeImageURL => () => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const getMoreImg = () => {
    setCcurrentPage(prevState => prevState + 1);
    setSearchQuery(searchQuery);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
  return (
    <div className={styles.App}>
      {error && <h1>Повторіть пошук</h1>}
      {showModal && <Modal imgSrc={largeImageURL} onClose={closeToggleModal} />}
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery>
        <ImageGalleryItem items={images} onClick={fetchClickImages} />
      </ImageGallery>
      {shouldRenderLoadMoreButton && <Button onClick={getMoreImg} />}
      {isLoading && <Loader />}
    </div>
  );
}
