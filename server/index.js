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
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (roomId, username, callback) => {
    console.log("roomId:", roomId)
    if(!socket.rooms.has(roomId)){
      socket.username = username
      socket.join(roomId)
      socket.to(roomId).emit('chat message', `${socket.username} has joined!`);
      socket.on('chat message', (msg) => {
        io.to(roomId).emit('chat message', msg);
      });
      socket.to(roomId).emit('join', {[socket.username]: socket.id});
      
      const clients = io.sockets.adapter.rooms.get(roomId)
      console.log("clients: ", clients, socket.id)
      const users = [...clients].map((clientId) => {
        const socket = io.sockets.sockets.get(clientId);
        return {[socket.username]: socket.id}
      })
      callback(users)
    }
  })

  socket.on('leave', (roomId) => {
    socket.to(roomId).emit('chat message', `${socket.username} has left!`);
    socket.removeAllListeners('chat message')
    socket.leave(roomId)
  })

});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


