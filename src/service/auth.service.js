import ApiError from 'utils/ApiError';
import userService from './user.service';
import httpStatus from 'http-status';

const authService = {};

authService.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!user.isActivated) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Please verify your email to active account'
    );
  }
  if (user.isBlocked) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Hi your account is block, contact to admin to unblock'
    );
  }
  return user;
};

export default authService;
