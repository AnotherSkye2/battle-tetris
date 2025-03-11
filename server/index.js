const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors:{
      origin: "http://localhost:5173",
      methods: ['GET','POST']
  }
});
var path = require('path');
const { SocketAddress } = require('net');
require('dotenv').config()
const ngrok = require("@ngrok/ngrok");


const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Require ngrok javascript sdk
// import ngrok from '@ngrok/ngrok' // if inside a module
if (process.env.NGROK == "true") {
  (async function() {
    // Establish connectivity
    const listener = await ngrok.forward({ addr: PORT, authtoken_from_env: true });
    
    // Output ngrok url to console
    console.log(`Ingress established at: ${listener.url()}`);
  })();
}

process.stdin.resume();

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('users', (roomId, callback) => {
    const clients = io.sockets.adapter.rooms.get(roomId)
    console.log("clients: ", clients, socket.id)
    if (clients) {
      const users = [...clients].map((clientId) => {
        const clientSocket = io.sockets.sockets.get(clientId);
        return {
          name: clientSocket.userName,
          socketId: clientSocket.id
        }
      })
      console.log(users)
      callback(users)
    } else {callback([])}
  })

  socket.on('join', (roomId, userName, callback) => {
    console.log("roomId:", roomId)
    if(!socket.rooms.has(roomId)){
      socket.userName = userName
      // socket.userId = userId
      socket.join(roomId)
      socket.to(roomId).emit('chat message', `${socket.userName} has joined!`);
      socket.on('chat message', (msg) => {
        io.to(roomId).emit('chat message', msg);
      });
      socket.to(roomId).emit('join', {         
        name: socket.userName,
      });
      const clients = io.sockets.adapter.rooms.get(roomId)
      console.log("clients: ", clients, socket.id)
      const users = [...clients].map((clientId) => {
        const socket = io.sockets.sockets.get(clientId);
        return {
          name: socket.userName,
        }
      })
      callback(users)
    }
  })

  socket.on('leave', (roomId) => {
    socket.to(roomId).emit('chat message', `${socket.userName} has left!`);
    socket.to(roomId).emit('leave', {          
      name: socket.userName,
    });
    socket.removeAllListeners('chat message')
    socket.leave(roomId)
  })

  socket.on('start', (roomId) => {
    console.log('start event called')
    io.to(roomId).emit('start', `${socket.userName} has started the game!`)
  })

  socket.on('board state', (roomId, gameGridArray) => {
    socket.to(roomId).emit('board state', gameGridArray, socket.userName)        
  })

  socket.on('score', (roomId, score) => {
    console.log(roomId, score)
    socket.to(roomId).emit('score', score, socket.userName)        
  })

  socket.on('garbage', (socketId, lines) => {
    console.log("garbage", socketId, lines)
    const client = io.sockets.adapter.rooms.get(socketId)
    console.log("client: ", client, socketId)
    socket.to(socketId).emit('garbage', lines, socket.userName)        
  })
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


