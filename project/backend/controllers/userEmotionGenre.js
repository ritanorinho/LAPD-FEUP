"use strict";

const UEG = require("../models/userEmotionGenre");
const Genre = require("../models/genre");

function getAll(req, res) {
  UEG.find()
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

function getGenre(req, res) {
  const { userId, emotionId } = req.params;
  const query = { userId, emotionId };
  UEG.find(query)
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

function getAllByUser(req, res) {
  const { userId } = req.params;
  const query = { userId };
  UEG.find(query)
    .then((uegs) => res.json({ uegs }))
    .catch((error) => res.status(400).json({ error }));
}

function addUeg(req, res) {
  const { body, payload } = req;
  const { emotionId, genreId} = body;
  const { _id } = payload;
  const userId = _id;
  console.log("addUeg");
  console.log("emotionId " + emotionId);
  console.log("genreId " + genreId);
  console.log("userId " + userId);
  const newUeg = new UEG({
    emotionId,
    genreId,
    userId,
  });
  newUeg
    .save()
    .then((ueg) => res.json({ ueg }))
    .catch((error) => res.status(400).json({ error }));
}


function deleteUeg(req, res) {
  console.log("id " + req.params.id)
  UEG.deleteOne({ _id: req.params.id }, error => {
    if (error) {
      console.log("error deleting uegs")
      res.status(404).json({ error });
    } else {
      console.log("ueg deleted!")
      res.status(200).json();
    }
  });
}

module.exports = {
  getAll,
  getGenre,
  getAllByUser,
  addUeg,
  deleteUeg,
};
