import { max } from 'moment';

const maxLength = 20;
let winPosition = [];
const Map = (data, x, y, id, ie) => {
  const value = data[x][y];
  let count = 0;

  let d = x;
  let e = y;
  while (d >= 0 && d < maxLength) {
    if (data[d][e] === value) {
      winPosition.push(e + 20 * d);
      count += 1;
      d += id;
      e += ie;
    } else break;
  }

  return count;
};

const verticalMap = (data, x, y) => {
  const vertical = Map(data, x, y, 0, 1) + Map(data, x, y, 0, -1);
  if (vertical !== 6) {
    winPosition = [];
  }
  return {
    status: vertical === 6,
    winArr: winPosition,
  };
};

const horizontalMap = (data, x, y) => {
  const vertical = Map(data, x, y, 1, 0) + Map(data, x, y, -1, 0);
  if (vertical !== 6) {
    winPosition = [];
  }
  return {
    status: vertical === 6,
    winArr: winPosition,
  };
};

const mainDiagonal = (data, x, y) => {
  const vertical = Map(data, x, y, 1, 1) + Map(data, x, y, -1, -1);
  if (vertical !== 6) {
    winPosition = [];
  }
  return {
    status: vertical === 6,
    winArr: winPosition,
  };
};

const secondaryDiagonal = (data, x, y) => {
  const vertical = Map(data, x, y, -1, 1) + Map(data, x, y, 1, -1);
  if (vertical !== 6) {
    winPosition = [];
  }
  return {
    status: vertical === 6,
    winArr: winPosition,
  };
};

export const checkEndGame = (data, x, y) => {
  let winArr = [];
  let status = false;
  if (verticalMap(data, x, y).status) {
    winArr = [...verticalMap(data, x, y).winArr];
    status = true;
  }
  if (horizontalMap(data, x, y).status) {
    winArr = [...horizontalMap(data, x, y).winArr];
    status = true;
  }
  if (mainDiagonal(data, x, y).status) {  
    winArr = [...mainDiagonal(data, x, y).winArr];
    status = true;
  }
  if (secondaryDiagonal(data, x, y).status) {
    winArr = [...secondaryDiagonal(data, x, y).winArr];
    status = true;
  }
  return {
    status,
    winArr,
  };
};
export const changeTo2D = (arr) => {
  const res = [];
  while (arr.length) {
    res.push(arr.splice(0, 20));
  }
  return res;
};
