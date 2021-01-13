const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  return res.json({ message: 'OK!' });
});

module.exports = router;
