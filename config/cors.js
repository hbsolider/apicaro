const cors = require('cors');

let origin;
if (process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:3000';
} else {
  origin = 'productio-url-here.com';
}
const cors = cors({ credentials: true, origin });
module.exports = {
  config: (app) => {
    app.use(cors);
  },
};
