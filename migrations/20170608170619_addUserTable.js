exports.up = function(knex, Promise) {
    return Promise.resolve(0).then(function() {
        return Promise.all([
            knex.schema.raw('ALTER TABLE projects ALTER COLUMN more TYPE TEXT'),
        ]);
    });
};
exports.down = function(knex, Promise) {
    return Promise.resolve(0).then(function() {
        return Promise.all([
            knex.schema.raw('ALTER TABLE projects ALTER COLUMN more TYPE VARCHAR'),
        ]);
    });
};
