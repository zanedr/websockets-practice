const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');


app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', (socket) => {
  if (Object.keys(io.sockets.sockets).length > 0) {
    console.log('comon in. i guess', Object.keys(io.sockets.sockets).length)
    socket.broadcast.emit('message', `Player ${Object.keys(io.sockets.sockets).length} has entered the game.`)
  }

  socket.on('message', (message) => {
    if(message.user && message.text) {
      socket.broadcast.emit('message', `${message.user}: ${message.text}`)
      socket.emit('message', `${message.user}: ${message.text}`)
    }
    if(message.welcome) {
      socket.emit('message', `${message.welcome}`)
    }
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Someone has left.`)
  })
})


http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
