"use strict";

const service = require("../services/facepp/constants");
const request = require("request");
const Emotion = require("../models/emotion");
const Record = require("../models/record");
const RecordEmotion = require("../models/recordEmotion");

async function postImageRecognition(req, res) {
  let base64 = req.body.photo.base64;
  let base64Data = base64.replace(/^data:image\/png;base64,/, "");
  let url = service.constants.url;
  //console.log("Image upload complete, creating request to: " + url);

  var formData = {
    api_key: service.constants.apikey,
    api_secret: service.constants.apisecret,
    image_base64: base64Data,
    return_attributes: "emotion",
  };

  const options = {
    uri: url,
    formData: formData,
    method: "POST",
  };
  const allEmotions = await Emotion.find().then((emotions) => {
    return emotions;
  });
  request(options, (err, response, body) => {
    if (err) console.log("Request err: ", err);

    let json_body = JSON.parse(body);
    if (json_body.error_message != undefined)
      res.status(404).json("error when try to find faces ");
    else {
      if (json_body.faces != undefined && json_body.faces.length == 0)
        res.status(404).json("error when try to find faces ");
      else {
        let emotions = json_body.faces[0].attributes.emotion;
        var result = [];
        var keys = Object.keys(emotions);

        const { payload } = req;
        const { _id } = payload;
        const date = new Date();
        const record = new Record({ userId: _id, date: date });
        record.save();

        allEmotions.forEach(function (key) {
          const recordEmotion = new RecordEmotion({
            recordId: record._id,
            emotionId: key._id,
            percentage: emotions[key.name],
          });
          recordEmotion.save();
        });
        res.json({ body });
      }
    }
  });

  request.shouldKeepAlive = false;
}

module.exports = {
  postImageRecognition,
};
