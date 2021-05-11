import axios from 'axios';

const apiKey = '19801401-97891ad1de0f373c60ecdf3d3';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImagesApi = ({
  searchQuery = 'all',
  currentPage = 1,
  perPage = 12,
}) => {
  return axios
    .get(
      `/?key=${apiKey}&q=${searchQuery}&page=${currentPage}&per_page=${perPage}&orientation=horizontal`,
    )
    .then(({ data }) => data.hits);
};
