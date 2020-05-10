"use strict";

const Emotion = require("../models/emotion");

function getAll(req, res) {
  const { payload } = req;
  Emotion.find()
    .then((emotions) => res.json({ emotions, payload }))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  getAll,
};
