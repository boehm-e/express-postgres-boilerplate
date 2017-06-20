import usersModel	from "./../models/users";
import permissions	from "./../../permissions";

const getCurrentUser = async (req, _, next = null) => {
    const auth = req.get('Authorization');

    if (!auth)
	req.user = { role: 'anonymous', data: null };
    else {
	const user = await usersModel.getByToken(auth);

	req.user = {
	    role: user ? user.role : 'anonymous',
	    data: user ? user : null
	};
    }

    // add permissions to the current user
    if (permissions.includes(req.user.role)) {
	req.user.permissions = [];
	getPermissions(req.user, JSON.parse(JSON.stringify(req.user.role)));
	console.log(req.user.permissions);
    }

    if (next) next();
};

const getPermissions = (user, role) => {
    user.permissions = user.permissions.concat(permissions[role].permissions);
    user.permissions.forEach(perm => {
	[['all','in'], ['in','self']].forEach(tabPerm => {
	    if (tabPerm[0] === perm.split('.')[1]) {
		let newPerm = perm.replace(/\.(.+)\./, () => `.${tabPerm[1]}.`);
		if (!user.permissions.includes(newPerm))
		    user.permissions.push(newPerm);
	    }
	});
    });
    if (permissions[role].hasOwnProperty('inherits'))
	getPermissions(user, permissions[role].inherits);
};


// req.body.targets = Array d'IDs
// req.targets = Array de modeles
// every models should have the following methods : getById, hasAccess

const getTargets = model => async (req, res, next) => { // targets must be ids
    if (req.params.hasOwnProperty('id'))
	req.targets = [req.params.id];
    if (req.body.hasOwnProperty('targets'))
	req.targets = Array.isArray(req.body.targets) ? req.body.targets : [req.body.targets];

    // turn IDs to models
    req.targets = req.targets.map(async (id) => model.getById(id));
};

// const filterPermissions = async (targets, permissions) => {
//     const collections = permissions
// 	      .filter(perm => ['in', 'self'].includes(perm.split('.')[1]))
// 	      .map(perm => [perm.split('.')[1], perm.split('.')[0]]);

//     collections.forEach(col => {

//     });
// };



const access = (permArr, filterPerms) => async (req, res, next) => {
    if (!req.hasOwnProperty('user'))
	await getCurrentUser(req);
    if (!req.hasOwnProperty('targets'))
	getTargets(req);
    if (req.hasOwnProperty('targets') && !!permArr.filter(perm => ['in', 'self'].includes(perm.split('.')[1])))
	await filterPermissions(req.targets, req.user.permissions); // check if the user is the target (self) or if he belongs to the targets (in)

};

export default {getCurrentUser};
