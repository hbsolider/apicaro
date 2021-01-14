import { onlineUserList } from './storage';
import { messageService } from 'service';

const chatRoom = (io) => {
  io.on('connection', (socket) => {
    const user = onlineUserList.getUserBySocketId(socket.id);

    socket.on('client-check-pass-room-and-join', async ({ roomId }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const isJoinRoomSuccess = user.joinRoom(roomId);
      const messages = await messageService.getManyByRoomId(roomId);
      if (isJoinRoomSuccess) {
        socket.emit('server-send-messages-room', {
          messages,
        });
      }
    });

    socket.on('client-send-message-room', async ({ roomId, content }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      await messageService.createOne({
        userId: user?.id,
        createdAt: new Date(),
        roomId,
        content,
      });
      const messages = await messageService.getManyByRoomId(roomId);
      io.to(roomId).emit('server-send-messages-room', {
        messages,
      });
    });
  });
};

export default chatRoom;
