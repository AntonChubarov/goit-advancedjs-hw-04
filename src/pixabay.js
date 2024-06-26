const apiKey = '16340491-42d6a19746059c85d486dedcd';

export const fetchImages = (query, page, perPage) => {
  return new Promise((resolve, reject) => {
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch images. Status code ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          reject(new Error('Sorry, there are no images matching your search query. Please try again.'));
        } else {
          const filteredHits = data.hits.map(hit => ({
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
            tags: hit.tags,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
          }));
          resolve({ totalHits: data.totalHits, hits: filteredHits });
        }
      })
      .catch(error => reject(new Error(`Error fetching images: ${error.message}`)));
  });
};
