const cors = require('cors');

let origin;
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:3000';
} else {
  origin = ['http://localhost:3000','https://socketserve.io/'];
}
module.exports = {
  config: (app) => {
    app.use(cors({ credentials: true, origin }));
  },
};
