const io = require('socket.io-client')

export default function () {
	const socket = io.connect('http://localhost:3000')

	function registerHandler(onMessageReceived) {
	  socket.on('message', onMessageReceived)
	}

	function unregisterHandler() {
	  socket.off('message')
	}

	socket.on('error', function (err) {
	  console.log('received socket error:')
	  console.log(err)
	})

	function register(name, cb) {
	  socket.emit('register', name, cb)
	}

	function join(flowerRoomName, cb) {
	  socket.emit('join', flowerRoomName, cb)
	}

	function leave(flowerRoomName, cb) {
	  socket.emit('leave', flowerRoomName, cb)
	}

	function message(flowerRoomName, msg, cb) {
	  socket.emit('message', { flowerRoomName, message: msg }, cb)
	}

	function getFlowerRooms(cb) {
	  socket.emit('flowerRoom', null, cb)
	}

	function getAvailableUsers(cb) {
	  socket.emit('availableUsers', null, cb)
	}	
	
	return {
		register,
		join,
		leave,
		message,
		getFlowerRooms,
		getAvailableUsers,
		registerHandler,
		unregisterHandler
	}
}
