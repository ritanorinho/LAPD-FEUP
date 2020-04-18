const constants = require('./constants');

const getEvents = ({ categoryId, genreId}) => constants.makeRequest({
  method: 'GET',
  endPoint: constants.endPoints.events,
  query: {
    segmentId: categoryId,
    genreId
  },
});

const getEvent = ({ eventId }) => constants.makeRequest({
  method: 'GET',
  endPoint: constants.endPoints.events + "/" + eventId,
});

module.exports = {
  getEvents,
  getEvent
};
