const Bookshelf = require('../../config/db');
const _ = require('lodash');
const bcrypt = require('bcrypt-then');


module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],

    /*update :async function(body){
        const realbody = _.pick(body, ['name', 'fname', 'address', 'status', 'password', 'email']);
        if (realbody.password) {
            realbody.password = await bcrypt.hash(realbody.password, 10);
        }
        var user = await this.where('email', '=', realbody.email).fetch();
        realbody.email = user.email;
        this.set(realbody);
        await this.save();

        return user;
    },*/

    light: function() {
        return _.pick(this.toJSON(), ["firstname"]);
    }
}, {

    async update(body, id){
        var user = this.getById(id);
        console.log(user);
    },

    async create(body) {
        var user = body;
        if (body.password) {
            body.password = await bcrypt.hash(realbody.password, 10);
        }
        return await (await new this(body).save()).fetch();
    },

    async getById(id) {
        return await this.query({where: {id}}).fetch();
    },

    async getAll() {
	     return await this.query({}).fetchAll();
    }
});
