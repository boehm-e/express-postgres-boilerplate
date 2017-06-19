exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('status', function(table) {
      table.increments('id').primary();
      table.string('tostring').unique();
    }),
    knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('fname');
        table.string('address');
        table.string('email').unique();
        table.integer('status').references('status.id');
        table.string('password');
      })
  ]);
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('status'),
    knex.schema.dropTable('users')
  ]);
};
