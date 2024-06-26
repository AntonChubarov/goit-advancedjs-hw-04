import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './pixabay.js';

const perPage = 40;
let currentPage = 1;
let totalHits = 0;
let currentQuery = '';

const loadMoreButton = document.querySelector('.load-more');
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const showElement = (element) => {
  element.classList.remove('visually-hidden');
};

const hideElement = (element) => {
  element.classList.add('visually-hidden');
};

const generateImageMarkup = (image) => {
  return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${image.downloads}
        </p>
      </div>
    </div>
  `;
};

const displayImages = (images) => {
  const markup = images.map(generateImageMarkup).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

const updateLoadMoreButton = () => {
  const loadMoreButton = document.querySelector('.load-more');
  if (currentPage * perPage >= totalHits) {
    hideElement(loadMoreButton);
    iziToast.info({
      title: 'Info', message: 'We\'re sorry, but you\'ve reached the end of search results',
    });
  } else {
    showElement(loadMoreButton);
  }
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  gallery.innerHTML = '';
  hideElement(loadMoreButton);

  const query = event.target.elements.searchQuery.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error', message: 'Please enter a search query',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = data.totalHits;
    iziToast.info({
      message: `Hooray! We found ${totalHits} images`,
    });
    displayImages(data.hits);
    updateLoadMoreButton();
  } catch (error) {
    iziToast.error({
      title: 'Error', message: error.message,
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    displayImages(data.hits);
    updateLoadMoreButton();
  } catch (error) {
    iziToast.error({
      title: 'Error', message: error.message,
    });
  }
});

hideElement(loadMoreButton);
