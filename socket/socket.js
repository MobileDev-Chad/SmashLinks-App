const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origins: ['http://192.168.2.11:3000'],
  },
});

const port = 3000;

var smashers = {},
  unmatched;

io.on('connection', (socket) => {
  console.log(socket.rooms.size);

  // Get username
  const { username } = socket.handshake.query;
  socket.username = username;

  console.log(`${username} connected`);
  // console.log(smashers);

  //   // Join the user to the channel.
  if (socket) {
    joinGame(socket, username);
  }

  if (getOpponent(socket)) {
    socket.emit('gamebegin', {
      symbol: smashers[socket.id].symbol,
    });
    getOpponent(socket).emit('gamebegin', {
      symbol: smashers[getOpponent(socket).id].symbol,
    });
  }

  socket.on('makechoice', function (data) {
    if (!getOpponent(socket)) {
      return;
    }
    socket.emit('choicemade', data);
    getOpponent(socket).emit('choicemade', data);

    socket.data.symbol = data.symbol;
    socket.data.character = data.character;
    console.log(socket.data);
  });

  socket.on('stagechoice', function (data) {
    if (!getOpponent(socket)) {
      return;
    }
    socket.emit('stageselected', data);
    getOpponent(socket).emit('stageselected', data);

    socket.data.stage = data.stage;
    console.log(socket.data);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);

    socket.leave(socket, username);

    console.log(socket.rooms.size);

    if (getOpponent(socket)) {
      getOpponent(socket).emit('opponentleft');
    }
  });
});

//Connect user to open room
function joinGame(socket, username) {
  smashers[socket.id] = {
    username: username,

    opponent: unmatched,

    symbol: 'blue',
    // The socket that is associated with this player
    socket: socket,
  };
  if (unmatched) {
    smashers[socket.id].symbol = 'red';
    smashers[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}

function getOpponent(socket) {
  if (!smashers[socket.id].opponent) {
    return;
  }
  return smashers[smashers[socket.id].opponent].socket;
}

server.listen(port, () => console.log('server running on port:' + port));
