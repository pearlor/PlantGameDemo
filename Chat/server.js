const Hapi = require('hapi');
const mongoose = require('mongoose');
const Joi = require('joi');

import * as handlers from './handlers';

const server = new Hapi.Server();
const socketio = require('socket.io')(server.listener);
const sockets = {};

server.connection({ port: 8888 });

socketio.on('connection', (socket) => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket;
  });
  socket.on('message', (message) => {
    if (sockets[message.receiverId]) {
      sockets[message.receiverId].emit('message', message);
    }
    /* handler for creating message */
  });
  socket.on('disconnect', (userId) => {
    delete sockets[userId.senderId];
  });
});

/*
 routes for specific handlers
 */

mongoose.connect('mongodb://localhost/db/friendChat');

server.start((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});