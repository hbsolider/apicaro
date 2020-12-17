import { max } from 'moment';

const maxLength = 16;

const Map = (data, x, y, id, ie) => {
  const value = data[x][y];
  let count = 0;

  let d = x;
  let e = y;
  while (d >= 0 && d < maxLength) {
    if (data[d][e] === value) {
      count += 1;
      d += id;
      e += ie;
    } else break;
  }

  return count;
};

const verticalMap = (data, x, y) => {
  const vertical = Map(data, x, y, 0, 1) + Map(data, x, y, 0, -1);
  return vertical === 6;
};

const horizontalMap = (data, x, y) => {
  const vertical = Map(data, x, y, 1, 0) + Map(data, x, y, -1, 0);
  return vertical === 6;
};

const mainDiagonal = (data, x, y) => {
  const vertical = Map(data, x, y, 1, 1) + Map(data, x, y, -1, -1);
  return vertical === 6;
};

const secondaryDiagonal = (data, x, y) => {
  const vertical = Map(data, x, y, -1, 1) + Map(data, x, y, 1, -1);
  return vertical === 6;
};

export const checkEndGame = (data, x, y) => {
  const a = verticalMap(data, x, y) || horizontalMap(data, x, y);
  const b = mainDiagonal(data, x, y) || secondaryDiagonal(data, x, y);
  return a || b;
};
export const ChangeTo2D = (data) => {
  let result = [];
  for (let i = 0; i < maxLength; i++) {
    result.push(data.slice(i*maxLength, i*maxLength + maxLength));
  }
  return result;
};
