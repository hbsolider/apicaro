import classifyRank from './classifyRank';
import { RANKS } from './constants';
const getPointWin = (firstPoint, secondPoint) => {
  const winRank = classifyRank(firstPoint);
  const loseRank = classifyRank(secondPoint);
  const levelWin = RANKS.indexOf(winRank);
  const levelLose = RANKS.indexOf(loseRank);
  if (levelWin < levelLose) {
    return (levelLose - levelWin + 1) * 10;
  } else {
    return 10;
  }
};
export default getPointWin;
