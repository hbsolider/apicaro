const router = require("express").Router();
const {
  getAllUser,
  login,
  register,
  logOut,
} = require("../controller/user.controller");
// const auth = require('../middleware/auth')
router.get("/", getAllUser);
router.post("/", login);
router.post("/register",register);
router.post('/logout',logOut)
module.exports = router;
