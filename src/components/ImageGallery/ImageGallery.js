import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, setModalImg }) {
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem images={images} setModalImg={setModalImg} />
    </ul>
  );
}

ImageGallery.propTypes = {
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
