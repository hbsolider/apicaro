import {
  ChessAtPosition,
  clientJoin,
  getListBoard,
  currentClient,
  clientDisconnet,
  getCurrentBoard,
} from './help';
const game = (io) => {
  io.on('connection', async (socket) => {
    console.log('client connect:', { socketId: socket.id });
    const room = await getListBoard();
    socket.on('get-list-room', async () => {
      io.sockets.emit('list-room', room);
    });
    socket.on('disconnect', () => {
      clientDisconnet(socket.id);
    });
    socket.on('join-room', (data) => {
      const client = clientJoin(socket.id, data);
      if (client) {
        const currentBoards = getCurrentBoard(client.room);
        socket.join(client.room);
        io.to(currentBoards.room).emit('get-boards', currentBoards.data);
      }
    });
    socket.on('play-chess', (position, room) => {
      const { have, data } = currentClient(socket.id, room);
      if (have) {
        const board = ChessAtPosition({
          position,
          room: data.room,
          turn: data.user.turn,
        });
        if (board.data !== null) {
          io.to(data.room).emit('get-boards', board.data.data);
        }
        if (board.winner !== null) {
          console.log(board.winner);
          io.to(data.room).emit('get-status', board.winner);
        }
      }
    });
  });
};
export default game;
