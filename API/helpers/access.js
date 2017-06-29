import usersModel from "./../models/users";

const getCurrentUser = async (req, _, next = null) => {
  const auth = req.get('Authorization');

  if (!auth)
  req.user = {
    role: 'anonymous',
    data: null
  };
  else {
    const user = await usersModel.getByToken(auth);

    req.user = {
      role: user ? user.role : 'anonymous',
      data: user ? user : null
    };
  }
  if (next)
  next();
};

export default {getCurrentUser};
