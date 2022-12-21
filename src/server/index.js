const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('message', (message) => {
      console.log(message);
      io.sockets.emit('message', message);
    });

    socket.on('typing',(typing)=>{
      console.log(typing);
      socket.broadcast.emit('typing',typing);
    });
  
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });

  httpServer.listen(5000,()=>{
    console.log('listening on 5000');
  })
 