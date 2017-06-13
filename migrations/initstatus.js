exports.up = function(knex, Promise) {
  return Promise.all([
    knex('status')
      .insert({tostring: "Membre Seed-up"}),
    knex('status')
      .insert({tostring: "Client"}),
    knex('status')
      .insert({tostring: "Candidat"}),
    knex('status')
      .insert({tostring: "Admin"})
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex('status')
      .where('tostring', 'Client')
      .del(),
    knex('status')
      .where('tostring', 'Candidat')
      .del(),
    knex('status')
      .where('tostring', 'Admin')
      .del(),
    knex('status')
      .where('tostring', 'Membre Seed-up')
      .del()
  ]);
};
