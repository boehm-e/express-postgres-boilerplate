const User = require('../models/user');

const getById = async (req, res) => {
    let user = (await User.get(req.params.id));
    return res.send(user);
};

const create = async (req, res) => {
    const user = await (User.create(req.body));
    return res.send(user);
};

const update = async (req, res) => {
  const user = (await User.update(req.body));
  return res.send(user);
};

const getAll = async (req, res) => {
  const users = (await User.getAll(req.body));
  return res.send(users);
};

export default {getById, create, update, getAll};
