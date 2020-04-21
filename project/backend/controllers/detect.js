"use strict";

const service = require("../services/facepp/postDetect");


async function postUrlRecognition(req, res) {
  let body = {req}
  let { imageUrl } = body.req.body; //TODO CHECK THIS 
  const details = await service.postDetectUrl({ imageUrl });
  res.json({ details });
}

async function postImageFileRecognition(req, res) {
  let body = req.post();
  let { imageFile } = body.data;
  const details = await service.postDetectUrl({ imageFile });
  res.json({ details });
}

async function postImageBase64Recognition(req, res) {
  let body = req.post();
  let { imageBase64 } = body.data;
  const details = await service.postDetectUrl({ imageBase64 });
  res.json({ details });
}


module.exports = {
  postUrlRecognition,
  postImageFileRecognition,
  postImageBase64Recognition
};
