const faker = require('faker');

// Default password: 123132
const defaultPassword =
  '$2a$12$VvWghIAnvkFgVG1hZ6OGyeaDtEPKGxZYmEu9PExiuke2WCDS5Fywe';

// Fake 50 users
const user = [...Array(50)].map(() => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: defaultPassword,
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar:
    'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
  isAdmin: false,
  isActivated: true,
  isBlocked: false,
  point: faker.random.number({
    min: 0,
    max: 600,
  }),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const room = user.map((value) => ({
  id: faker.random.uuid(),
  name: faker.lorem.words(),
  createdBy: value.id,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const game = user.reduce((p, u, i) => {
  return [
    ...room.reduce((pre, current) => {
      return [
        {
          id: faker.random.uuid(),
          roomId: current.id,
          playerFirst: u.id,
          playerSecond: user[i + 1 >= user.length ? 0 : i + 1].id,
          userWin: u.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          completeAt: new Date(),
        },
        ...pre,
      ];
    }, []),
    ...p,
  ];
}, []);

const randomBoard = () => {
  return [...Array(400)]
    .map(() => {
      const randomNumber = faker.random.number({
        min: 1,
        max: 3,
      });
      if (randomNumber === 1) return 'x';
      if (randomNumber === 2) return 'o';
      if (randomNumber === 1) return null;
    })
    .join(', ');
};

const steps = [...Array(30)].map(() => {
  return {
    id: faker.random.uuid(),
    gameId: 'b7f8f6f9-a7f5-4f75-af60-2bb0a4394ba9',
    userId: 'fb0f2ae9-d8a4-4a82-a5f2-9993e23b71a9',
    board: randomBoard(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const messagesOfFirstPlayer = [...Array(15)].map(() => {
  return {
    id: faker.random.uuid(),
    content: faker.lorem.words(),
    userId: 'fb0f2ae9-d8a4-4a82-a5f2-9993e23b71a9',
    roomId: room[0].id,
    createdAt: new Date('2021-01-12T20:28:12'),
    updatedAt: new Date(),
  };
});

const messagesOfSecondePlayer = [...Array(15)].map(() => {
  return {
    id: faker.random.uuid(),
    content: faker.lorem.words(),
    userId: 'eb9de1bd-b9a1-44ac-9e64-6189cd2c65e3',
    roomId: room[0].id,
    createdAt: new Date('2021-01-12T20:29:15'),
    updatedAt: new Date(),
  };
});

module.exports = {
  user,
  game,
  room,
  steps,
  defaultPassword,
  messages: [...messagesOfFirstPlayer, ...messagesOfSecondePlayer],
  up: () => Promise.resolve(),
  down: () => Promise.resolve(),
};
