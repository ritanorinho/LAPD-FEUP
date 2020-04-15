"use strict";

const User = require('../models/user');

function mockData() {
  return [
    new User({
      name: "Jane Doe",
      email: "janeDoe@gmail.com",
      password: "12345678",
      settings: "Quiz"
    }),
    new User({
      name: "John Doe",
      email: "johnDoe@gmail.com",
      password: "12345678",
      settings: "Camera"
    }),
  ];
}

function seedUser() {
  const users = mockData();
  User.find({})
    .deleteMany()
    .then(() => {
      User.create(users, (err) => {
        if (err) {
          console.error(`Error seeding user: ${err}`);
        }
      });
    });
}

module.exports = { seedUser };
