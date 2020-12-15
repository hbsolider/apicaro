export const handleConnect = (clients, user, socketId) => {
  const userId = user.id;
  if (clients[userId]) {
    clients[userId]?.sockets?.push(socketId);
  } else {
    clients[userId] = { info: user, sockets: [socketId] };
  }
  return clients;
};

export const handleCreateRoom = (rooms, user, room, socketId) => {
  const id = room.id;
  if (rooms[id]) {
    rooms[id]?.sockets?.push(socketId);
  } else {
    rooms[id] = { info: user, room: room, users: [], sockets: [socketId] };
  }
  return rooms;
};

export const transformRoomInfo = (rooms) => {
  return Object.values(rooms).map(({ room }) => ({
    id: room.id,
    status: room.status,
    name: room.name,
  }));
};

export const transformUserInfo = (clients) => {
  return Object.values(clients).map(({ info }) => ({
    id: info.id,
    email: info.email,
    name: info.name,
  }));
};

export const handleDisconnect = (clients, userId, socketId) => {
  if (clients[userId])
    clients[userId].sockets = clients[userId]?.sockets?.filter?.(
      (id) => id !== socketId
    );
  if (clients[userId]?.sockets && !clients[userId].sockets.length)
    delete clients[userId];
  return clients;
};
