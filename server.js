// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

let content = '';

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.emit('load-content', content);

  socket.on('send-changes', (newContent) => {
    content = newContent;
    socket.broadcast.emit('receive-changes', newContent);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
