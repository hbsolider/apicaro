import OnlineUserList from './OnlineUserList';
import RoomList from './RoomList';
import GameList from './GameList';
import MatchingListUser from './MatchingUserList';

export const onlineUserList = new OnlineUserList();
export const roomList = new RoomList();
export const gameList = new GameList();
export const queueBronze = new MatchingListUser();
export const queueSilver = new MatchingListUser();
export const queueGold = new MatchingListUser();
export const queuePlatium = new MatchingListUser();
export const queueDiamond = new MatchingListUser();
export const queueMaster = new MatchingListUser();
