import axios from 'axios';

const apiKey = '16340491-42d6a19746059c85d486dedcd';

export const fetchImages = async (query, page, perPage) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    if (!response.data.hits.length) {
      throw new Error('Sorry, there are no images matching your search query. Please try again.');
    }

    const filteredHits = response.data.hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads,
    }));

    return { totalHits: response.data.totalHits, hits: filteredHits };

  } catch (error) {
    throw new Error(error.message);
  }
};
