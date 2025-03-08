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

  socket.on('join', (roomId, callback) => {
    console.log("roomId:", roomId)
    if(!socket.rooms.has(roomId)){
      socket.join(roomId)
      socket.to(roomId).emit('chat message', `A player (${socket.id}) has joined!`);
      socket.on('chat message', (msg) => {
        io.to(roomId).emit('chat message', msg);
      });
      const clients = io.sockets.adapter.rooms.get(roomId)
      console.log("clients: ", clients, socket.id)
      socket.to(roomId).emit('join', socket.id);
      callback([...clients])
    }
  })

  socket.on('leave', (roomId) => {
    socket.to(roomId).emit('chat message', `A player (${socket.id}) has left!`);
    socket.removeAllListeners('chat message')
    socket.leave(roomId)
  })

});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


