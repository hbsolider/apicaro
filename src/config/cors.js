const cors = require('cors');

let origin;
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:3000';
} else {
  origin = [
    'http://localhost:3000',
    'https://socketserve.io/',
    'https://caro-game-anhem1nha.herokuapp.com/',
  ];
}
module.exports = {
  config: (app) => {
    app.use(cors({ credentials: true, origin }));
  },
};
