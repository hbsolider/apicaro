import ApiError from 'utils/ApiError';
import userService from './user.service';
import httpStatus from 'http-status';

const authService = {};

authService.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

export default authService;
