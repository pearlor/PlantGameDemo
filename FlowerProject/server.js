var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {}; // aka the sockets
/*
io.on('connection', function(socket){
      console.log('a user connected!');
});
*/
io.on('connection', function (client) {
	// on connection
	console.log('a user connected');
	
	// subscribe to timer
	client.on('subscribeToTimer', function (interval) {
		console.log('client is subscribing to timer with interval ', interval);
		setInterval(() => {
		  client.emit('timer', new Date());
		}, interval);
	});
	
	// add points 
	client.on('addPoints', function (total) {
		console.log('Aloha! Adding points here!!!');
		client.emit('userPoints', total);
	});
	
	// on disconnect 
	client.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});
/*
var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});

// variable io as importing socket.io
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

// server to emit events to client

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

// telling socket.io to listen for clients
const port = 3000;
server.listen(port, function(){
	console.log('listening on *: 3000');
});
*/