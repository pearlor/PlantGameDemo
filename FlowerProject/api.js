import openSocket from 'socket.io-client';
var  socket = openSocket('ws://192.168.0.21:3000');
function subscribeToTimer(cb) {
	console.log("hi");
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };