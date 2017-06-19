import Bookshelf	from '../../config/db';
import _		from 'lodash';

module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],
    async update(body) {
        this.set(body);
        return await this.save();
    },
    light() {
        return _.pick(this.toJSON(), ["firstname"]);
    }
}, {
    async create(body) {
        const user = await (await new this(body).save()).fetch();

        return user;
    },

    async getById(id) {
        return await this.query({where: {id}}).fetch();
    },

    async getAll() {
	return await this.query({}).fetchAll();
    }
});
