const axios = require('axios');


const constants = {
  url: "https://app.ticketmaster.com",
  apiKey: "CVPGAXrc0kY9yNeXYAE2eDhAqCzGkFGn",
};

const endPoints = {
  events: "events",
};

const makeUrl = (endPoint, query) => {
  let url = `${constants.url}/discovery/v2/${endPoint}?apikey=${constants.apiKey}&`;
  console.log("URL "+url);

  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key]) url += `${key}=${query[key]}&`;
    });
  }

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
