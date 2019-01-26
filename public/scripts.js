const postProject = async() => {
  const projectName = $('.new-project-name').val()
  const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: projectName
        })
      })
  if(!response.ok) {
    throw Error(response.statusText)
  } 
  fetchProjects()
  $('.new-project-name').val('')
}

const fetchProjects = async () => {
  const response = await fetch('/api/projects')
  if(!response.ok) {
    throw Error(response.statusText)
  }
  const projects = await response.json() 
  displayProjects(projects)
}

const updateProjectList = (project) => {
  $('#styledSelect1').append(
    ` <option value=${project.id}>
      ${project.name}
    </option>`)
}

const postPalette = async() => {
  const paletteName = $('.new-palette-name').val()
  const selectedProject = $('#styledSelect1').find(":selected").val();
  const color1 = $('.color-1-hex').text()
  const color2 = $('.color-2-hex').text()
  const color3 = $('.color-3-hex').text()
  const color4 = $('.color-4-hex').text()
  const color5 = $('.color-5-hex').text()
  const response = await fetch('/api/palettes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: paletteName,
          project_id: selectedProject,
          color_1: color1,
          color_2: color2,
          color_3: color3,
          color_4: color4,
          color_5: color5
        })
      })
  if(!response.ok) {
    throw Error(response.statusText)
  } 
  console.log(response.ok)
}

const fetchPalettes = async () => {

}

const displayProjects = (projects) => {
  projects.map(project => {
    displayProjectCard(project)
    updateProjectList(project)
  })
}

const displayProjectCard = project => {
  $('.project-list').append(`<div class="project-card"><h4>${project.name}</h4></div>`)
}

const randomHex = () => {
  let color = '#'
  for(let i = 0; i <= 5; i++) {
    const values = [1 ,2 , 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    color+=values[Math.floor(Math.random() * Math.floor(values.length))]
  }
  return color
}

const randomPalette = () => {
  palette = []
  for(let i = 0; i <= 4; i++) {
    palette.push(randomHex())
  }
  displayPalette(palette)
}

const displayPalette = (palette) => {
  if($('.color-1').children().hasClass('fa-unlock')) {
    $('.color-1').css('background', palette[0])
    $('.color-1-hex').text(palette[0])
  }
  if($('.color-2').children().hasClass('fa-unlock')) {
    $('.color-2').css('background', palette[1])
    $('.color-2-hex').text(palette[1])
  }
  if($('.color-3').children().hasClass('fa-unlock')) {
    $('.color-3').css('background', palette[2])
    $('.color-3-hex').text(palette[2])
  }
  if($('.color-4').children().hasClass('fa-unlock')) {
    $('.color-4').css('background', palette[3])
    $('.color-4-hex').text(palette[3])
  }
  if($('.color-5').children().hasClass('fa-unlock')) {
    $('.color-5').css('background', palette[4])
    $('.color-5-hex').text(palette[4])
  }
}

randomPalette()
fetchProjects()

$('.new-palette').on('click', randomPalette)

$('i').on('click', (e) => {
  if($(e.target).hasClass('fa-unlock')) {
    $(e.target).removeClass('fa-unlock').addClass('fa-lock')
  } else {
    $(e.target).removeClass('fa-lock').addClass('fa-unlock')
  }
})

$('.save-project-name').on('click', postProject)

$('.save-palette').on('click', postPalette)
