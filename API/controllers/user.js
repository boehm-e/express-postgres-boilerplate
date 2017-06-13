const User = require('../models/user');
const resources = require('../static_string.json');

const getById = async (req, res, next) => {
    try{
        const user = (await User.getById(req.params.id));
    }catch(err){
        var check = err.toString().indexOf(resources.DB_INVALID_INPUT_ERROR_NORESULT);
        if(check >= 0){
            return res.send({ error: resources.ERROR_INVALID_PARAMETRE });
        }else{
            console.log(err);
        }
        return next(err);
    }


    return res.send(user);
};

const create = async (req, res, next) => {
    try{
        const user = await (User.create(req.body));
        const response = {
            message: resources.WELCOME_MESSAGE,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        };
        return res.send(response);

    }catch(err){
        var check = err.toString().indexOf(resources.DB_UNIQUE_CONSTRAINT_ERROR);
        if(check >= 0){
            return res.send({ error: resources.ERROR_EMAIL_ALREADY_EXIST });
        }else{
            console.log(err);
        }
        return next(err);
    }
};

const update = async (req, res, next) => {
  const user = await (User.update(req.body, req.params.id));
  console.log(user);
  return res.send(user);
};

const getAll = async (req, res) => {
  const users = (await User.getAll(req.body));
  return res.send(users);
};

export default {getById, create, update, getAll};
