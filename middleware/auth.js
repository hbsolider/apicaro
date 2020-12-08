const jwt = require("jsonwebtoken");
const User = require("../database/models").user;

async function auth(req, res, next) {
  if (!req.header("Authorization")) {
    return res.status(403).json({ error: "token must required" });
  }
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    await User.findOne({
        where:{
            id:data.user.id
        }
    }).then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }
      req.user = user;
      req.token = token;
    });
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Something went wrong with your account!" });
  }
}

module.exports = auth;