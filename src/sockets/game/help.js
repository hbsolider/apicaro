import { board as Board } from '../../database/models';

let Rooms = [];
let Boards = [];
let squarePerRow = 16;
let Status = [];
console.log(Rooms);
export const getListBoard = async () => {
  try {
    return await Board.findAll();
  } catch (error) {
    console.log(error);
  }
};
export const clientJoin = (socketId, { user, room }) => {
  const checkUserHaveInRoom = () => {
    for (let i = 0; i < Rooms.length; i++) {
      if (Rooms[i].user.id === user.id) return { have: true, index: i };
    }
    return { have: false, index: null };
  };
  const { have, index } = checkUserHaveInRoom();
  const turn = Rooms.length % 2 === 0 ? 'x' : 'o';
  if (!have) {
    Rooms.push({ socketId, user, room, turn });
    return Rooms[Rooms.length - 1];
  }
  Rooms[index].socketId = socketId;
  return Rooms[index];
};
export const CreateBoard = (room) => {
  const checkBoardExist = () => {
    for (let i = 0; i < Boards.length; i++) {
      if (Boards.room === room) return { have: true, index: i };
    }
    return { have: false, index: null };
  };
  const { have, index } = checkBoardExist();
  let arr = Array(16 * 16).fill(null);
  if (!have) {
    Status.push({ room, xIsNext: true });
    Boards.push({ room, data: arr });
    return Boards[Boards.length - 1];
  }
  return Boards[index];
};
export const currentClient = (socketId) => {
  const room = Rooms.find((room) => room.socketId === socketId);
  if (room) return { have: true, data: room };
  return { have: false, data: null };
};
export const ChessAtPosition = ({ room, turn, position }) => {
  const currentBoard = Boards.find((b) => b.room === room);
  const status = Status.find((s) => s.room === room);
  console.log(turn, status.xIsNext);
  // if (status.xIsNext) {
  //   if (turn === 'o') return currentBoard.data;
  // }
  let tempTurn = status.xIsNext ? 'x' : 'o';
  console.log('temp turn', tempTurn, Rooms.length);
  if (turn !== tempTurn) return currentBoard.data;
  currentBoard.data[position] = tempTurn;
  status.xIsNext = !status.xIsNext;
  return currentBoard.data;
};
