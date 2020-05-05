'use strict'

const service = require('../services/facepp/constants')
const request = require('request')
const Emotion = require('../models/emotion')

async function postImageRecognition (req, res) {
  let base64 = req.body.photo.base64
  let base64Data = base64.replace(/^data:image\/png;base64,/, '')
  let url = service.constants.url
  console.log('Image upload complete, creating request to: ' + url)

  var formData = {
    api_key: service.constants.apikey,
    api_secret: service.constants.apisecret,
    image_base64: base64Data,
    return_attributes: 'emotion'
  }

  const options = {
    uri: url,
    formData: formData,
    method: 'POST'
  }
  request(options, (err, response, body) => {
    console.log('Request complete')
    if (err) console.log('Request err: ', err)
    let json_body = JSON.parse(body)
    console.log(json_body)
    let emotions = json_body.faces[0].attributes.emotion
    var result = []
    var keys = Object.keys(emotions)

    keys.forEach(function (key) {
      console.log(key + ' : ' + emotions[key])

      result.push(emotions[key])
    })

    res.json({ body })
  })
  const { payload } = req;
  console.log("PAY "+payload);
  request.shouldKeepAlive = false;
}

module.exports = {
  postImageRecognition
}
