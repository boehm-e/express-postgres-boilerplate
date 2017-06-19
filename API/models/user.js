const Bookshelf = require('../../config/db');
const _ = require('lodash');
const bcrypt = require('bcrypt-then');
const COLUMNS = {columns: ['name', 'fname', 'address', 'email', 'status', 'password']};


module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],

    update :async function(body){
        /*
            A compléter
        */
    },

    light: function() {
        return _.pick(this.toJSON(), ["firstname"]);
    }
}, {

    async update(body, user){
        /*
            A compléter
        */
    },

    async create(body) {
        if (body.password) {
            body.password = await bcrypt.hash(realbody.password, 10);
        }
        return await (await new this(body).save()).fetch();
    },

    async getById(id) {
        return await this.query({where: {id}}).fetch(COLUMNS);
    },

    async getAll() {
	     return await this.query({}).fetchAll(COLUMNS);
    },

    async delete(id) {
      try {
        await new this({id: id}).destroy({require: true});
        } catch (e) {
            return false;
        }
        return true;
      }
});
