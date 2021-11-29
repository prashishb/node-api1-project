// imports
const express = require('express');
const User = require('./users/model');

// instance of express app
const server = express();

// global middleware
server.use(express.json());

// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

// [POST] /api/users
server.post('/api/users', async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: 'Missing name or bio',
      });
    } else {
      const newUser = await User.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
});

// [GET] /api/users
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
});

// [GET] /api/users/:id
server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `User with id ${req.params.id} does not exist`,
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
});

module.exports = server;
