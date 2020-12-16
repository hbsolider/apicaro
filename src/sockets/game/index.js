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
    const room = await getListBoard();
    socket.on('get-list-room', async () => {
      io.sockets.emit('list-room', room);
    });
    socket.on('disconnect', () => {
      clientDisconnet(socket.id);
    });
    socket.on('join-room', (data) => {
      const client = clientJoin(socket.id, data);
      const currentBoards = getCurrentBoard(client.room);
      socket.join(client.room);
      io.to(client.room).emit('get-boards', currentBoards.data);
    });
    socket.on('play-chess', (position, user) => {
      const { have, data } = currentClient(user.id);
      if (have) {
        const board = ChessAtPosition({
          position,
          room: data.room,
          turn: data.user.turn,
        });
        if (board !== null) {
          io.to(data.room).emit('get-boards', board.data);
        }
      }
    });
  });
};
export default game;
