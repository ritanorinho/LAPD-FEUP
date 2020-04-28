const axios = require('axios');


const constants = {
  url: "https://api-us.faceplusplus.com",
  apikey: "e5UDzBjbpFYQLMtHh5gEXaOCJInnEdTy",
  apisecret: "1FMPrMGQ4zwEGdFpae4rNHy13yzPWHFc"
};

const endPoints = {
  detect: "detect",
};

const makeUrl = (endPoint, query) => {
  let url = `${constants.url}/facepp/v3/${endPoint}?api_key=${constants.apikey}&api_secret=${constants.apisecret}&`;

  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key]) url += `${key}=${query[key]}&`;
    });
  }
  console.log(url)
  return url;
};

const makeRequest = async ({ endPoint, method, data, query }) => {
  const url = makeUrl(endPoint, query);
  const res = await axios({
    method,
    url,
    data,
  });

  return res.data;
};

module.exports = {
  constants,
  endPoints,
  makeRequest
}
