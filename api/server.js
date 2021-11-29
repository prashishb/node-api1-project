// imports
const express = require('express');

// instance of express app
const server = express();

// global middleware
server.use(express.json());

module.exports = server;
