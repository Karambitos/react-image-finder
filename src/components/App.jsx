import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { TailSpin } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import getImages from '../api/imageAPI';
import { Component } from 'react';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
};

export default class App extends Component {
  state = {
    images: [],
    resaltLength: 0,
    searchQuery: '',
    currentPage: 1,
    isOpen: false,
    imageModal: [],
    status: statusList.idle,
  };

  componentDidMount() {
    this.handleGetImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleGetImages();
    } else if (prevState.currentPage !== this.state.currentPage) {
      getImages(this.state.searchQuery, this.state.currentPage)
        .then(res =>
          this.setState(prevState => ({
            images: [...prevState.images, ...res.data.hits],
            status: statusList.success,
          }))
        )
        .catch(error => this.setState({ error, status: statusList.error }));
    }
  }

  handleGetImages = () => {
    this.setState({ status: statusList.loading });
    getImages(this.state.searchQuery, this.state.currentPage)
      .then(res =>
        this.setState({
          images: res.data.hits,
          status: statusList.success,
          resaltLength: res.data.totalHits,
        })
      )
      .catch(error => this.setState({ error, status: statusList.error }));
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery !== event.target.serach.value) {
      this.setState({ searchQuery: event.target.serach.value, currentPage: 1 });
      event.target.serach.value = '';
      window.scrollTo(0, 0);
    } else if (this.state.searchQuery === event.target.serach.value) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
      }));
      event.target.serach.value = '';
      window.scrollTo(0, 0);
    }
  };

  setModalImg = id => {
    const { largeImageURL, tags } = this.state.images.find(
      images => images.id === id
    );
    this.setState({
      imageModal: { largeImageURL: largeImageURL, tags: tags },
      isOpen: true,
    });
  };

  toggleModal = e => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { isOpen, imageModal, status, images, resaltLength } = this.state;

    return (
      <div className="App">
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <img src={imageModal.largeImageURL} alt={imageModal.tag} />
          </Modal>
        )}
        {status === 'loading' && (
          <Modal>
            <TailSpin />
          </Modal>
        )}
        <Searchbar handleSubmit={this.handleSubmit} />
        {images.length > 0 || status === 'error' ? (
          <ImageGallery images={images} setModalImg={this.setModalImg} />
        ) : (
          <div className="container">
            <h1>There are no images for your request</h1>
            <p>
              Sorry, we couldn't find any images that match your search. Please
              try again with different keywords.
            </p>
          </div>
        )}
        {resaltLength > images.length && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
