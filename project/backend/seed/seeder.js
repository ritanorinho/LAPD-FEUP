'use strict';

const user = require('./user');
const emotion = require('./emotion');
const category = require('./category');
const genre = require('./genre');


function seedDB() {
  user.seedUser();
  emotion.seedEmotion();
  const { musicId, sportsId, artsId, filmId, miscellaneousId } = category.seedCategory();
  genre.seedGenre(musicId, sportsId, artsId, filmId, miscellaneousId);
}


module.exports = { seedDB };
