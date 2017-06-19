const User = require('../models/user');
const resources = require('../static_string.json');

const getById = async (req, res, next) => {
    try{
        const user = (await User.getById(req.params.id));

        return res.send(user);
    }catch(err) {
        const check = err.toString().indexOf(resources.DB_INVALID_INPUT_ERROR_NORESULT);

        return (0 <= check)
            ? res.send({ error: resources.ERROR_INVALID_PARAMETRE })
            : next(err);
    }
};

const create = async (req, res, next) => {
    try{
        const user = await (User.create(req.body));

        const response = {
            message: resources.WELCOME_MESSAGE,
            name: user.name,
            email: user.email,
            createdAt: user.created_at
        };

        return res.send(response);

    }catch(err) {
        const check = err.toString().indexOf(resources.DB_UNIQUE_CONSTRAINT_ERROR);

        return (0 <= check)
            ? res.send({ error: resources.ERROR_EMAIL_ALREADY_EXIST })
            : next(err);
    }
};

const update = async (req, res) => {
  const user = (await User.getById(req.params.id));
  const updated = (await User.update(req.body, user));

  return res.send(updated);
};

const getAll = async (req, res) => {
  const users = (await User.getAll(req.body));

  return res.send(users);
};

export default {getById, create, update, getAll};
