"use strict";

const service = require("../services/facepp/postDetect");


async function getUrlRecognition(req, res) {
  const { imageUrl } = req.params;
  const details = await service.postDetectUrl({ imageUrl });
  res.json({ details });
}

module.exports = {
  getUrlRecognition
};
