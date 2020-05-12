"use strict";

const Record = require("../models/record");

function getAll(req, res) {
  Record.find()
    .then((records) => res.json({ records }))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  getAll,
};
