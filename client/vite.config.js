import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSocketIO from 'vite-plugin-socket-io'

const socketEvents = (io, socket) => {
  console.log('socket.io - connection');
  socket.on('disconnect', () => {
    console.log(`socket.io - socket.id \`${socket.id}\` disconnected`)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSocketIO({socketEvents})],
})
