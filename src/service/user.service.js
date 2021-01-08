import { User } from 'database/models';
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import { ROLES } from 'utils/constants';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const userService = {};

userService.getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

userService.getUserById = async (id) => {
  return await User.findOne({
    where: {
      id,
    },
  });
};

userService.updateUserById = async (fields, id) => {
  return await User.update(fields, {
    where: {
      id,
    },
  });
};

userService.createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

userService.getRolesFromId = async (id) => {
  const user = await getUserById(id);
  const roles = [ROLES.USER];
  if (user.isAdmin) roles.push(ROLES.ADMIN);
  return roles;
};

userService.oAuthLogin = async ({ service, id, email, name, avatar }) => {
  const user = await User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: {
      [Op.or]: {
        email,
        [Op.or]: {
          facebook: id,
          google: id,
        },
      },
    },
  });
  if (user) {
    user[service] = id;
    if (!user.name) user.name = name;
    if (!user.avatar) user.avatar = avatar;
    return user.save();
  }
  const password = uuidv4();
  return User.create({
    [service]: id,
    email,
    password,
    name,
    avatar,
  });
};

export default userService;
