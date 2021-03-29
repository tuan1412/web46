const bcrypt = require('bcryptjs');
const UserModel = require('./user');

const createUser = async (user) => {
  const { email, password } = user;

  const existedUser = await UserModel.findOne({ email });

  if (existedUser) throw new Error('Existed user');

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await UserModel
    .create({ email, password: hashPassword });

  return newUser;
}

const login = async ({ email, password }) => {
  const existedUser = await UserModel.findOne({ email });

  if (!existedUser) throw new Error('Not found user');

  const hashPassword = existedUser.password;

  const comparedPassword = bcrypt.compareSync(password, hashPassword);

  if (!comparedPassword) throw new Error('Password is wrong');

  return existedUser;
}

module.exports = {
  createUser,
  login
}