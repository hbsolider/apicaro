import { userService } from 'service';

const getRankList = (io) => {
  io.on('connection', (socket) => {
    socket.on('client-connect', async () => {
      const rankList = await userService.getListUserOrderByRank();
      io.sockets.emit('server-send-rank-list', { rankList });
    });
  });
};

export default getRankList;
