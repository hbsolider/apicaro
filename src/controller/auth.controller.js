import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import { userService, tokenService, authService } from 'service';

const authController = {};

authController.register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).json({ user: user.transform(), tokens });
});

authController.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.json({ user: user.transform(), tokens });
});

authController.oAuth = async (req, res, next) => {
  try {
    const { user } = req;
    const tokens = await tokenService.generateAuthTokens(user);
    delete user.password;
    res.json({ user, tokens });
  } catch (error) {
    return next(error);
  }
};

export default authController;
