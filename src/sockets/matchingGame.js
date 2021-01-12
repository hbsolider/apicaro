import {
  onlineUserList,
  roomList,
  queueBronze,
  queueSilver,
  queueGold,
  queuePlatium,
  queueDiamond,
  queueMaster,
} from './storage';
import Room from './storage/Room';
import { USER_STATUS } from 'utils/constants';
import { USER_RANK } from 'utils/constants';
import { v4 as uuidv4 } from 'uuid';

const matchingGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      const rankUser = user ? user.getRankUser() : '';
      switch (rankUser) {
        case USER_RANK.MASTER:
          queueMaster.dequeue();
          break;
        case USER_RANK.DIAMOND:
          queueDiamond.dequeue();
          break;
        case USER_RANK.PLATINUM:
          queuePlatium.dequeue();
          break;
        case USER_RANK.GOLD:
          queueGold.dequeue();
          break;
        case USER_RANK.SILVER:
          queueSilver.dequeue();
          break;
        case USER_RANK.BRONZE:
          queueBronze.dequeue();
          break;
        default:
          break;
      }
    });

    socket.on('client-send-matching-game', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      user.updateStatus(USER_STATUS.SEARCHING);
      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('client-send-cancel-matching-game', () => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      user.updateStatus(USER_STATUS.ONLINE);
      const rankUser = user.getRankUser();
      switch (rankUser) {
        case USER_RANK.MASTER:
          queueMaster.dequeue();
          break;
        case USER_RANK.DIAMOND:
          queueDiamond.dequeue();
          break;
        case USER_RANK.PLATINUM:
          queuePlatium.dequeue();
          break;
        case USER_RANK.GOLD:
          queueGold.dequeue();
          break;
        case USER_RANK.SILVER:
          queueSilver.dequeue();
          break;
        case USER_RANK.BRONZE:
          queueBronze.dequeue();
          break;
        default:
          break;
      }

      const userList = onlineUserList.transform();
      io.sockets.emit('server-send-user-list', { userList });
    });

    socket.on('client-send-check-matching-game', ({ rank }) => {
      const user = onlineUserList.getUserBySocketId(socket.id);
      if (user.status !== USER_STATUS.SEARCHING) {
        return;
      }
      const rankUser = rank ? rank : user.getRankUser();
      let playerFirst = {};
      const playerSecond = user;
      let isMatched = false;
      switch (rankUser) {
        case USER_RANK.MASTER:
          if (queueMaster.isEmpty() && !rank) {
            queueMaster.enqueue(user);
          } else if (!queueMaster.isEmpty()) {
            isMatched = true;
            playerFirst = queueMaster.dequeue();
          }
          break;
        case USER_RANK.DIAMOND:
          if (queueDiamond.isEmpty() && !rank) {
            queueDiamond.enqueue(user);
          } else if (!queueDiamond.isEmpty()) {
            isMatched = true;
            playerFirst = queueDiamond.dequeue();
          }
          break;
        case USER_RANK.PLATINUM:
          if (queuePlatium.isEmpty() && !rank) {
            queuePlatium.enqueue(user);
          } else if (!queuePlatium.isEmpty()) {
            isMatched = true;
            playerFirst = queuePlatium.dequeue();
          }
          break;
        case USER_RANK.GOLD:
          if (queueGold.isEmpty() && !rank) {
            queueGold.enqueue(user);
          } else if (!queueGold.isEmpty()) {
            isMatched = true;
            playerFirst = queueGold.dequeue();
          }
          break;
        case USER_RANK.SILVER:
          if (queueSilver.isEmpty() && !rank) {
            queueSilver.enqueue(user);
          } else if (!queueSilver.isEmpty()) {
            isMatched = true;
            playerFirst = queueSilver.dequeue();
          }
          break;
        case USER_RANK.BRONZE:
          if (queueBronze.isEmpty() && !rank) {
            queueBronze.enqueue(user);
          } else if (!queueBronze.isEmpty()) {
            isMatched = true;
            playerFirst = queueBronze.dequeue();
          }
          break;
        default:
          break;
      }
      if (isMatched) {
        const roomsNow = roomList.transform();
        const rooms = roomsNow.map((room) => room.joinId);
        const joinId = rooms.length > 0 ? Math.max(...rooms) + 1 : 1;
        const roomName = playerFirst.name + ' vs ' + playerSecond.name;
        const roomCreated = new Room(
          uuidv4(),
          joinId,
          roomName,
          playerFirst,
          '',
          '30',
          playerSecond
        );
        roomList.add(roomCreated);
        const userConnects = [...playerFirst.sockets, ...playerSecond.sockets];
        user.updateStatus(USER_STATUS.IN_ROOM);
        userConnects.forEach((connect) => {
          io.to(connect).emit('server-send-matching-success', {
            roomId: roomCreated.id,
            password: roomCreated.password,
          });
        });

        io.sockets.emit('server-send-room-list', {
          listRoom: roomList.transform(),
        });
      }
    });
  });
};

export default matchingGame;
