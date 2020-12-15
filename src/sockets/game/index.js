import {
  ChessAtPosition,
  CreateBoard,
  clientJoin,
  getListBoard,
  currentClient,
} from './help';
const game = (io) => {
  io.on('connection', async (socket) => {
    console.log('client connect', socket.id);
    const room = await getListBoard();
    socket.on('get-list-room', async () => {
      io.sockets.emit('list-room', room);
    });
    socket.on('disconnect', () => {
      console.log('client disconnet', socket.id);
    });
    socket.on('join-room', (data) => {
      const client = clientJoin(socket.id, data);
      const currentBoards = CreateBoard(client.room);
      socket.join(client.room);
      // socket.broadcast.emit('get-boards', currentBoards.data);
    });
    socket.on('play-chess', (position) => {
      const { have, data } = currentClient(socket.id);
      console.log({ have, data });
      if (have) {
        const board = ChessAtPosition({
          position,
          room: data.room,
          turn: data.turn,
        });
        io.to(data.room).emit('get-boards', board);
      }
    });
  });
};
export default game;
