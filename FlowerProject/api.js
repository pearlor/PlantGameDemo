import openSocket from 'socket.io-client';
var  socket = openSocket('ws://192.168.0.21:3000');

function addPoints(currentPoints, amountToAdd, cb) {
	var total = currentPoints + amountToAdd;
	console.log("Your Points: " + amountToAdd + " + " + currentPoints + " = " + total);
	socket.on('userPoints', points => cb(null, points));
	socket.emit('addPoints', total);
}

function subscribeToTimer(interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', interval);
}
export { subscribeToTimer, addPoints };