const server = require('http').createServer()
const io = require('socket.io')(server)

const ClientManager = require('./ClientManager')
const FlowerRoomManager = require('./FlowerRoomManager')
const makeHandlers = require('./handlers')

const clientManager = ClientManager()
const flowerRoomManager = FlowerRoomManager();

io.on('connection', function(client) {
	const {
		handlerRegister,
		handleJoin,
		handleLeave,
		handlerMessage,
		handleGetFlowerRooms,
		handleGetAvailableUsers,
		handleDisconnect
	} = makeHandlers(client, clientManager, flowerRoomManager)
	
	console.log('client connected!!!', client.id)
	clientManager.add(client)
	
	client.on('register', handleRegister)
	client.on('join', handleJoin)
	client.on('leave', handleLeave)
	client.on('message', handleMessage)
	client.on('flowerrooms', handleGetFlowerRooms)
	client.on('availableUsers', handleGetAvailableUsers)
	
	client.on('disconnect', function (){
		console.log('client disconnect!!!', client.id)
		handleDisconnect()
	})
})

server.listen(3000, function (err) {
	if(err) throw err
	console.log('listening on port 3000')
})