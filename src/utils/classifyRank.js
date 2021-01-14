import { USER_RANK } from './constants';
const classifyRank = point => {
  switch (true) {
    case point < 100: {
      return USER_RANK.BRONZE;
    }
    case point < 200: {
      return USER_RANK.SILVER;
    }
    case point < 300: {
      return USER_RANK.GOLD;
    }
    case point < 400: {
      return USER_RANK.PLATINUM;
    }
    case point < 500: {
      return USER_RANK.DIAMOND;
    }
    default: {
      return USER_RANK.MASTER;
    }
  }
};
export default classifyRank;
