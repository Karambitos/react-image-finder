import React from 'react';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, setModalImg }) {
  return (
    <>
      {images.map(({ webformatURL, largeImageURL, tags, id }) => {
        return (
          <li key={uuidv4()} className={styles.ImageGalleryItem}>
            <img
              className={styles.ImageGalleryItemImage}
              onClick={() => setModalImg(id)}
              src={webformatURL}
              data-src={largeImageURL}
              alt={tags}
            />
          </li>
        );
      })}
    </>
  );
}

ImageGalleryItem.propTypes = {
  setModalImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
