"use strict";

const Category = require("../models/category");

function getAll(req, res) {
   Category.find()
    .then((categories) => res.json({ categories }))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  getAll,
};
