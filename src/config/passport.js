import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import BearerStrategy from 'passport-http-bearer';
import { jwt as jwtVars } from 'config/vars';
import { TOKEN_TYPES } from 'utils/constants';
import { User } from 'database/models';
import { authProviders, userService } from 'service';

const jwtOptions = {
  secretOrKey: jwtVars.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const oAuth = (service) => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await userService.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    console.log('err', err);
    return done(err);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
export const facebookStrategy = new BearerStrategy(oAuth('facebook'));
export const googleStrategy = new BearerStrategy(oAuth('google'));
