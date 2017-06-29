//    Here are some keywords that we will use in the definition of
//    permissions :

//    ACTIONS :
//        - list    = GET all ressources names or description
//        - detail  = GET the details of one or multiple ressources
//        - create  = POST some ressources (create it)
//        - edit    = POST / UPDATE or modifie some ressources
//        - delete  = DELETE one or multiple ressources

//    POSITIONS :
//        - all     = for all the ressource(s) of a collection
//        - in      = when the ressource(s) concerns the current user an other ones
//        - self    = when the ressource(s) concerns the current user ONLY
//        - role:?  = when the ressource(s) concerns a certain role / group of users

//        self < in < all

//    The permissions have the following shape :

//    collection.[POSITION].[ACTION].(specific_permission)

const permissions = {
    guest: {
	permissions: [
	    'users.all.list',
	    'users.all.detail'
	]
    },
    customer: {
	permissions: [
	    'users.self.edit',
	    'projects.in.list',
	    'projects.in.detail'
	],
	inherits: 'guest'
    },
    member: { /* seed-up */
	permissions: [
	    'projects.in.edit',
	    'projects.all.list',
	    'projects.all.detail',
	    'projects.self.create'
	],
	inherits: 'customer'
    },
    admin: {
	permissions: [
	    'projects.all.delete',
	    'projects.all.create',
	    'projects.all.edit'
	],
	inherits: 'member'
    }
};

const corresp = {
    users: require('./API/models/user')
//    projects: require('./API/models/projects')
};


const collectionToModel = async (strCol) => {
    const model = corresp[strCol];

    if (!model)
	throw new Error(`No model corresponding to the collection name ${strCol}`);
    else
	return model;
};

export {permissions, collectionToModel}
