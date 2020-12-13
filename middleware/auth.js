const jwt = require("jsonwebtoken");
const User = require("../database/models").user;

async function auth(req, res, next) {
  if (!req.header("Authorization")) throw new Error('Token is must required')
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
        where:{
            id:data.user.id
        }
    })
    if(!user) throw new Error('Invalid token')
    req.user=user;
    // .then((user) => {
    //   if (!user) {
    //     return res.status(401).json({ message: "Unauthenticated" });
    //   }
    //   req.user = user;
    //   req.token = token;
    // });
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = auth;