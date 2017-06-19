exports.up = function(knex, Promise) {
  return Promise.all([
    knex('status')
      .insert({tostring: "member"}),
    knex('status')
      .insert({tostring: "customer"}),
    knex('status')
      .insert({tostring: "candidate"}),
    knex('status')
      .insert({tostring: "admin"})
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex('status')
      .where('tostring', 'member')
      .del(),
    knex('status')
      .where('tostring', 'customer')
      .del(),
    knex('status')
      .where('tostring', 'candidate')
      .del(),
    knex('status')
      .where('tostring', 'admin')
      .del()
  ]);
};
