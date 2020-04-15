"use strict";

const Genre = require("../models/genre");

function getAll(req, res) {
   Genre.find()
    .then((genres) => res.json({ genres }))
    .catch((error) => res.status(400).json({ error }));
}


function getAllFromCategory(req, res) {
    const query = { categoryId: req.params.categoryId };
    Genre.find(query)
     .then((genres) => res.json({ genres }))
     .catch((error) => res.status(400).json({ error }));
 }
 

module.exports = {
  getAll,
  getAllFromCategory
};
