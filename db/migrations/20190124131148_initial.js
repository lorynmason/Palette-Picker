
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', (table) => {
      table.increments('id').primary();
      table.string('color_1');
      table.string('color_2');
      table.string('color_3');
      table.string('color_4');
      table.string('color_5');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ]);
};
