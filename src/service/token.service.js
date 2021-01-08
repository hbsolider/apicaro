import jwt from 'jsonwebtoken';
import moment from 'moment';
import { jwt as jwtVars } from 'config/vars';
import { TOKEN_TYPES } from 'utils/constants';

const tokenService = {};

const generateToken = (userId, expires, type, secret = jwtVars.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

tokenService.generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    jwtVars.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

export default tokenService;
