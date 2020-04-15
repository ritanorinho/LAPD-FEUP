'use strict';

const user = require('./user');

function seedDB() {
  user.seedUser();
}


module.exports = { seedDB };
