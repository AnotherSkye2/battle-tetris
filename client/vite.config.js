import vitePluginSocketIO from 'vite-plugin-socket-io'
import { defineConfig } from 'vite';

const socketEvents = (io, socket) => {
  console.log('socket.io - connection');
  socket.on('disconnect', () => {
    console.log(`socket.io - socket.id \`${socket.id}\` disconnected`)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
}

export default defineConfig({
  plugins: [vitePluginSocketIO({socketEvents})]
})