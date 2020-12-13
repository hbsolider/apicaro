const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const errorHandle = require('../utils/errorHandle');

module.exports = {
  configRouter: (app) => {
    let router = [];
    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file) => {
        const f = file.split('.')[0];
        router.push({ name: f, file: file });
      });
    for (let i = 0; i < router.length; i++) {
      app.use(
        `/api/${router[i].name}`,
        require(path.join(__dirname, router[i].file))
      );
    }
  },
};
