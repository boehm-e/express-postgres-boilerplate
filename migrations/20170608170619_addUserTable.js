exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('fname');
      table.string('address');
      table.string('email').unique();
      table.integer('status').references('status.id');
      table.string('password');
    }).createTable('status', function(table) {
      table.increments('id').primary();
      table.string('tostring').unique();
    });
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
