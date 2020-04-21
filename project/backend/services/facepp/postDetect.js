const constants = require('./constants');

const postDetectUrl = ({ imageUrl }) => constants.makeRequest({
  method: 'POST',
  endPoint: constants.endPoints.detect,
  query: {
    image_url: imageUrl,
    return_attributes: "emotion"
  },
});


const postDetectImageFile = ({ imageFile }) => constants.makeRequest({
  method: 'POST',
  endPoint: constants.endPoints.detect,
  query: {
    image_file: imageFile,
    return_attributes: "emotion"
  },
});


const postDetectImageBase64 = ({ imageBase64 }) => constants.makeRequest({
  method: 'POST',
  endPoint: constants.endPoints.detect,
  query: {
    image_base64: imageBase64,
    return_attributes: "emotion"
  },
});


module.exports = {
  postDetectUrl,
  postDetectImageFile,
  postDetectImageBase64
};
