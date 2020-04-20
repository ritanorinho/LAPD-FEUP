const constants = require('./constants');

const postDetectUrl = ({ imageUrl }) => constants.makeRequest({
  method: 'POST',
  endPoint: constants.endPoints.detect,
  query: {
    image_url: imageUrl,
    return_attributes: "emotion"
  },
});



module.exports = {
  postDetectUrl
};
