'use strict'

const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Emotion = require('../models/emotion')
const UEG = require('../models/userEmotionGenre')
const Genre = require('../models/genre')
const Category = require('../models/category')
const Record = require('../models/record')
const RecordEmotion = require('../models/recordEmotion')
const ObjectID = require('mongodb').ObjectID

function getAll (req, res) {
  User.find()
    .then(users => res.json({ users }))
    .catch(error => res.status(400).json({ error }))
}

function add (req, res) {
  const saltRounds = 10

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.find({ email: req.body.email }).then(user => {
      if (user.length !== 0) res.status(406).json({ error: 'Invalid email' })
      else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          settings: 'Camera'
        })
        newUser
          .save()
          .then(item => res.json({ item }))
          .catch(error => res.status(400).json({ error }))
      }
    })
  })
}

function login (req, res, next) {
  return passport.authenticate(
    'login-user',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err)
      }
      if (passportUser) {
        const reqUser = {
          _id: passportUser._id,
          name: passportUser.name,
          email: passportUser.email,
          username: passportUser.username,
          settings: passportUser.settings,
          photo: passportUser.photo
        }

        req.login(reqUser, error => {
          if (error) {
            return res.send({ error })
          }
          return res.json({
            user: passportUser.toAuthJSON()
          })
        })
      } else {
        return res.status(400).json(info)
      }
    }
  )(req, res, next)
}

function get (req, res) {
  User.find({ _id: req.params.id })
    .then(user => {
      res.json({ user })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

async function getPreferences (req, res) {
  const { payload } = req
  const { _id } = payload
  let events = []
  let preferences = []
  await Category.find()
    .then(async categories => {
      for (const category of categories) {
        await Genre.find({ categoryId: category._id })
          .then(genres => {
            events.push({ category, genres })
          })
          .catch()
      }
      await Emotion.find()
        .then(async emotions => {
          for (const emotion of emotions) {
            await UEG.find({ emotionId: emotion._id, userId: _id })
              .then(uegs => {
                preferences.push({ emotion, uegs })
              })
              .catch()
          }
        })
        .catch()
      res.json({ events, preferences })
    })
    .catch()
}

function hashPassword (password) {
  return bcrypt.hashSync(password, 10)
}

function logout (req, res) {
  req.logout()
  return res.status(200).json('Logged out')
}

async function getCurrent (req, res) {
  let { payload } = req
  const { _id } = payload
  const userId = _id
  let query = { userId }
  let emotionId
  let emotionName = 'neutral'

  await User.findById(_id).then((user) => {
    payload = user;
  })

  await Record.find(query)
    .sort({ date: -1 })
    .then(async records => {
      if (records.length > 0) {
        let id = records[0].id
        let query = { recordId: id }
        await RecordEmotion.find(query)
          .sort({ percentage: -1 })
          .then(async emotion => {
            emotionId = emotion[0].emotionId
            await Emotion.find({ _id: emotionId }).then(async e => {
              emotionName = e[0].name
            })
          })
      }
    })
  return res.status(200).json({ payload, emotionName })
}

async function updateSettings (req, res) {
  const { payload } = req
  const { _id } = payload
  const query = { _id: _id }
  const update = { settings: req.body.emotion_recognition }
  await User.findByIdAndUpdate(query, update, {
    returnOriginal: false,
    useFindAndModify: false,
    upsert: true
  }).then(user => {
    return res.status(200).json({ user: user })
  })
}

module.exports = {
  getAll,
  add,
  getPreferences,
  login,
  logout,
  getCurrent,
  hashPassword,
  get,
  updateSettings
}
