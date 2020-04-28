"use strict";

const service = require("../services/facepp/postDetect");

async function postUrlRecognition(req, res) {
  let body = { req };
  let { imageUrl } = body.req.body; //TODO CHECK THIS
  const details = await service.postDetectUrl({ imageUrl });
  res.json({ details });
}

async function postImageFileRecognition(req, res) {
  let body = req.body.photo;
  let { imageFile } = body.data;
  const details = await service.postDetectUrl({ imageFile });
  res.json({ details });
}

async function postImageBase64Recognition(req, res) {
  console.log("base 64");
  let imageBase64 = req.body.photo.base64;
  const details = await service.postDetectImageBase64({ imageBase64 });
  console.log("DETAILS "+details);
  res.json({ details });
}

module.exports = {
  postUrlRecognition,
  postImageFileRecognition,
  postImageBase64Recognition,
};
