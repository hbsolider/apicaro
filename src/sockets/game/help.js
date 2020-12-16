import { board as Board } from '../../database/models';

let Rooms = [];
let Boards = [];
// let squarePerRow = 16;
let Status = [];
export const getListBoard = async () => {
  try {
    return await Board.findAll();
  } catch (error) {
    console.log(error);
  }
};
export const clientDisconnet = (socketId) => {
  let rooms = Rooms.filter((r) => {
    return r.socketId === socketId;
  });
  if (rooms.length === 0) {
    Boards = Boards.filter((board) => board.room !== rooms.room);
    return Rooms;
  }
  Rooms = rooms;
  return Rooms;
};
export const clientJoin = (socketId, { user, room }) => {
  const checkRoom = Rooms.filter((r) => r.room === room);
  const checkUser = Rooms.filter((r) => r.user.id === user.id);
  let newUser = (turn) => ({ user: { turn: turn, ...user }, room, socketId });
  if (checkRoom.length === 0) {
    Rooms.push(newUser('x'));
    CreateBoard(room);
    return Rooms[Rooms.length - 1];
  } else {
    if (checkUser.length === 0) {
      if (checkRoom.length === 1) {
        Rooms.push(newUser('o'));
      } else {
        Rooms.push(newUser(null));
      }
      return Rooms[Rooms.length - 1];
    } else {
      const index = Rooms.findIndex((r) => r.user.id === user.id);
      Rooms[index].socketId = socketId;
      return Rooms[index];
    }
  }
};
const CreateBoard = (room) => {
  const checkBoardExist = Boards.filter((board) => board.room === room);
  if (checkBoardExist.length === 0) {
    const data = Array(16 * 16).fill(null);
    Boards.push({ room, data, xIsNext: true });
  }
};
export const getCurrentBoard = (room) => {
  const boards = Boards.filter((board) => board.room === room);
  return boards[0];
};
export const currentClient = (userId) => {
  const room = Rooms.find((room) => room.user.id === userId);
  if (room) return { have: true, data: room };
  return { have: false, data: null };
};
export const ChessAtPosition = ({ room, turn, position }) => {
  let current = Boards.findIndex((board) => board.room === room);
  if (current !== -1) {
    let xIsNext = Boards[current].xIsNext;
    if (Boards[current].data[position] === null) {
      if (xIsNext && turn === 'x') {
        Boards[current].data[position] = 'x';
        Boards[current].xIsNext = false;
      } else if (!xIsNext && turn === 'o') {
        Boards[current].data[position] = 'o';
        Boards[current].xIsNext = true;
      }
    }
    return Boards[current];
  }
  return null;
};
