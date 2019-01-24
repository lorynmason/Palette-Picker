let projectsData = [{
  id: 1, 
  name: 'Project 1', 
  palettes: [
    {
      id: 1, 
      color_1: '#88F2B1', 
      color_2: '#4BC914', 
      color_3: '#6DF8CB', 
      color_4: '#12B795', 
      color_5: '#149486', 
      name: 'greens' 
    }, {
      id: 2, 
      color_1: '#88F2B1', 
      color_2: '#4BC914', 
      color_3: '#6DF8CB', 
      color_4: '#12B795', 
      color_5: '#149486', 
      name: 'blues' 
    }
  ]
}, {
    id: 2, 
    name: 'Project 2', 
    palettes: [
      {
        id: 1, 
        color_1: '#88F2B1', 
        color_2: '#4BC914', 
        color_3: '#6DF8CB', 
        color_4: '#12B795', 
        color_5: '#149486', 
        name: 'greens' 
      }, {
        id: 2, 
        color_1: '#88F2B1', 
        color_2: '#4BC914', 
        color_3: '#6DF8CB', 
        color_4: '#12B795', 
        color_5: '#149486', 
        name: 'blues' 
      }
    ]
  }
]
const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name
  }, 'id')
  .then(projectId => {
    let palettesPromises = [];

    project.palettes.forEach(palette => {
      palettesPromises.push(
        createPalette(knex, {...palette,
           project_id: projectId[0]
        })
      )
    });

    return Promise.all(palettesPromises);
  })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del()) 
    .then(() => {
      let projectPromises = [];

      projectsData.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
