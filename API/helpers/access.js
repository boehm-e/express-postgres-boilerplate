import usersModel			from "./../models/users";
import {permissions, collectionToModel}	from "./../../permissions";

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

// getCurrentUser :
//     - get `req.user`
//     - insert all inherited permissions in `req.user.permissions`

// access :
//     - get `req.targets` (need the target model)
//     - check if user has `self` or `in` permissions
//       -> filter the 'in' or 'self' permissions like that :  req.targets[0].hasAccess(req.user.id, 'self / in')
//     - if req.user.permissions contains at leat one permission in the access permissions --> next, else --> 401.


// req.body.targets = Array of IDs
// req.targets = Array of models
// every models should have the following methods : getById, hasAccess
//

const getTargets = model => async (req, res, next) => { // targets must be ids
    if (req.params.hasOwnProperty('id'))
	req.targets = [req.params.id];
    if (req.body.hasOwnProperty('targets'))
	req.targets = Array.isArray(req.body.targets) ? req.body.targets : [req.body.targets];

    // turn IDs to models
    req.targets = req.targets.map(async (id) => await model.getById(id));
};


const checkPermissions = async (user, targets = [], permissions) =>
      permissions.some(perm => targets.some(async (target) => await target.hasAccess(user.id, perm.split('.')[1])));


const access = (permArr) => async (req, res, next) => {
    if (!req.hasOwnProperty('user'))
	await getCurrentUser(req);

    const noMatchingPermissions = !!permArr.filter(perm => req.user.permissions.includes(perm)).length;
    const commonPermissions = req.user.permissions.filter(perm => permArr.includes(perm));
    const needTocheckUserPerm = !!commonPermissions
	  .filter(commonPerm => !['in', 'self'].includes(commonPerm.split('.')[1]))
	  .length;

    if (noMatchingPermissions) {
	return res.status(401).end("Not Authorized. You don't have sufficient permissions to access this route !");
    } else if (needTocheckUserPerm) {
	return checkPermissions(req.user, req.targets, commonPermissions)
	    ? next()
	    : res.status(401).end("Not Authorized. You don't have sufficient permissions to access this route.");
    } else {
	return next();
    }
};

export default {getCurrentUser, getTargets};
