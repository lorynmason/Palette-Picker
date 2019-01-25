const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use( bodyParser.json() );

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

// app.locals.projects = [
//   { id: '1', name: 'Project 1'},
//   { id: '2', name: 'Project 2'},
//   { id: '3', name: 'Project 3'}
// ];

// app.locals.palettes = [
//   { id: '1', name: 'Palette 1', project_id: 1},
//   { id: '2', name: 'Palette 2', project_id: 1},
//   { id: '3', name: 'Palette 3', project_id: 2 },
//   { id: '4', name: 'Palette 4', project_id: 2 },
//   { id: '5', name: 'Palette 5', project_id: 3 },
// ];

// app.get('/api/projects', (request, response) => {
//   const { projects } = app.locals
//   return response.json({ projects });
// });

app.get('/api/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// app.get('/api/palettes', (request, response) => {
//   const { palettes } = app.locals
//   return response.json({ palettes });
// });

app.post('/api/palettes', (request, response) => {
  const id = Date.now();
  const palette = request.body.palette;

  if (!palette) {
    return response.status(422).send({
      error: 'No palette property provided'
    });
  } else {
    app.locals.palettes.push({ id, ...palette });
    return response.status(201).json({ id });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});