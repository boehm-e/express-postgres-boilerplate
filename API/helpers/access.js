import usersModel from "./../models/users";


const getCurrentUser = async (req, _, next = null) => {
    let auth = req.get('Authorization');

    if (!auth)
	req.user = {
	    role: 'anonymous',
	    data: null
	};
    else {
	let user = await usersModel.getByToken(auth);

	req.user = {
	    role: user ? user.role : 'anonymous',
	    data: user ? user : null
	};
    }
    if (next)
	next();
};

const RBAC = () => {

};


export default {RBAC, getCurrentUser};
