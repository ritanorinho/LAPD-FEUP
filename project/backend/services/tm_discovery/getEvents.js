import makeRequest, { endPoints } from './constants';

export const getEvents = ({ categoryId, genreId}) => makeRequest({
  method: 'GET',
  endPoint: endPoints.events,
  query: {
    categoryId,
    genreId
  },
});
