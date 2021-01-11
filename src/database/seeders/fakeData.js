const faker = require('faker');

// Default password: 123132
const defaultPassword =
  '$2a$12$VvWghIAnvkFgVG1hZ6OGyeaDtEPKGxZYmEu9PExiuke2WCDS5Fywe';

// Fake 50 students
const user = [...Array(50)].map(() => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: defaultPassword,
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar:
    'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png',
  isAdmin: false,
  isActivated: true,
  isBlocked: true,
  point: faker.random.number(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const room = user.map((value) => ({
  id: faker.random.uuid(),
  name: faker.random.number(999),
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
module.exports = {
  user,
  game,
  room,
  defaultPassword,
  up: () => Promise.resolve(),
  down: () => Promise.resolve(),
};
