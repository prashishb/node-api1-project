// imports
const express = require('express');
const User = require('./users/model');

// instance of express app
const server = express();

// global middleware
server.use(express.json());

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

// [DELETE] /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `User with id ${req.params.id} does not exist`,
      });
    } else {
      const deletedUser = await User.remove(req.params.id);
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
});

// [PUT] /api/users/:id
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    if (!body.name || !body.bio) {
      res.status(400).json({
        message: 'Missing name or bio',
      });
    } else {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({
          message: `User with id ${req.params.id} does not exist`,
        });
      } else {
        const updatedUser = await User.update(id, body);
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
});

module.exports = server;
