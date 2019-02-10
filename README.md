# Palette-Picker
Palette-Picker allows users to generate a random color palette and save it. 

View [live site](https://lm-palette-picker.herokuapp.com/)

### Install/Setup Instructions

````
git clone https://github.com/lorynmason/palette-picker.git

cd palette-picker

npm install

node server.js (or 'nodemon server.js')
````

### Abstract
The goal of this app was to build a color palette selection tool similar to a site like Coolors, with the primary focus being the back end. The front end is built in jQuery and the back end is built with an Express server and PostreSQL database which communicate via Knex. The site is deployed on Heroku.

### User Stories

Generate a Palette

````
As a user, 

I should be able to generate a palette with 5 distinct colors.
I should be able to hold or “freeze” one color and generate a new palette while the frozen color remains 
the same.
The colors should be randomly generated.

```` 

Create a Project

````
As a user,

I should be able to create a project folder as a place to save palettes
I should be able to create multiple project folders.
The saved folder should persist on the page.
````

Save Palettes

````
As a user,

I should be able to name a generated palette and save it to a project folder.
The saved palette should appear in the folder with the name of the palette and the saved palette colors
When I click on the saved palette, the palette generator should show the colors of that saved palette.
````

Deleting
````
As a user,

I should be able to delete a palette from a project folder, and I should be able to delete a whole project, 
which removes it from the page and database.
```` 

````
As a user,

I should never have to reload the page to see any changes
````

### Wireframes

<img width="961" alt="screen shot 2019-02-10 at 11 11 29 am" src="https://user-images.githubusercontent.com/40005248/52537664-75ceb900-2d26-11e9-8b94-df310d28cfa7.png">
<img width="880" alt="screen shot 2019-02-10 at 11 11 48 am" src="https://user-images.githubusercontent.com/40005248/52537669-897a1f80-2d26-11e9-8c9d-e467e13ccf8c.png">

### Finished Design 

<img width="1212" alt="screen shot 2019-02-10 at 11 32 42 am" src="https://user-images.githubusercontent.com/40005248/52537786-a82ce600-2d27-11e9-9710-bd59af3c2c76.png">
<img width="1208" alt="screen shot 2019-02-10 at 11 32 57 am" src="https://user-images.githubusercontent.com/40005248/52537796-bf6bd380-2d27-11e9-812d-6997b31e0138.png">

