'use strict'

const Emotion = require('../models/emotion')

function getAll (req, res) {
  Emotion.find()
    .then(emotions => res.json({ emotions }))
    .catch(error => res.status(400).json({ error }))
}

module.exports = {
  getAll,
}
