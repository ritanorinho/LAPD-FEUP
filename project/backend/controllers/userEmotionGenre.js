"use strict";

const UEG = require("../models/userEmotionGenre");
const Genre = require("../models/genre");


function getAll(req, res) {
    UEG.find()
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

function getGenre(req, res) {
  const {userId, emotionId} = req.params;
  const query = { userId, emotionId};
  UEG.find(query)
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

function getAllByUser(req, res) {
  const {userId} = req.params;
  const query = { userId };
  UEG.find(query)
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  getAll,
  getGenre,
  getAllByUser
};
