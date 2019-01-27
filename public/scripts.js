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
  const palettes = await fetchPalettes() 
  displayProjects(projects, palettes)
}

const updateProjectList = (project) => {
  $('#styledSelect1').append(
    ` <option class="options" value=${project.id}>
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
  $('.new-palette-name').val('')
  fetchProjects()
}

const fetchPalettes = async () => {
  const response = await fetch('/api/palettes')
  if(!response.ok) {
    throw Error(response.statusText)
  }
  const palettes = await response.json()
  return palettes
}

const deletePalette = async (e) => {
  const IDs = $(e.target).next().attr("class").split(' ')
  const response = await fetch('/api/palettes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: IDs[1],
      project_id: IDs[0]
    })
  })
  fetchProjects()
}


const displayProjects = (projects, palettes) => {
  $('.project-list').children().remove()
  $('#styledSelect1').children('.options').remove()
  projects.map(project => {
    project.palettes = []
    palettes.forEach(palette => {
      if(project.id === palette.project_id){
        project.palettes.push(palette)
      }
    })
    displayProjectCard(project)
    updateProjectList(project)
  })
}

const displayProjectCard = project => {
  $(`.project-list`).append(`<div class="project-card"><i id="exit" class="fas fa-times-circle"></i><h4>${project.name}</h4><ul class="palette-list${project.id}"></ul></div>`)
  project.palettes.map(palette => {
    $(`.palette-list${project.id}`).append(`
    <h6>${palette.name}</h6>
    <i id="trash-can" class="fas fa-trash-alt"></i>
    <li class="${project.id} ${palette.id}" alt="${palette.color_1} ${palette.color_2} ${palette.color_3} ${palette.color_4} ${palette.color_5}">
      <div class="project-color ${project.id}-${palette.id}-1"></div>
      <div class="project-color ${project.id}-${palette.id}-2"></div>
      <div class="project-color ${project.id}-${palette.id}-3"></div>
      <div class="project-color ${project.id}-${palette.id}-4"></div>
      <div class="project-color ${project.id}-${palette.id}-5"></div>
    </li>`)
    setColor(project, palette)
  })
}

const setColor = (project, palette) => {
  $(`.${project.id}-${palette.id}-1`).css('background', palette.color_1)
  $(`.${project.id}-${palette.id}-2`).css('background', palette.color_2)
  $(`.${project.id}-${palette.id}-3`).css('background', palette.color_3)
  $(`.${project.id}-${palette.id}-4`).css('background', palette.color_4)
  $(`.${project.id}-${palette.id}-5`).css('background', palette.color_5)
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

const displaySavedPalette = (palette) => {
  $('.color-1').css('background', palette[0])
  $('.color-1-hex').text(palette[0])
  $('.color-2').css('background', palette[1])
  $('.color-2-hex').text(palette[1])
  $('.color-3').css('background', palette[2])
  $('.color-3-hex').text(palette[2])
  $('.color-4').css('background', palette[3])
  $('.color-4-hex').text(palette[3])
  $('.color-5').css('background', palette[4])
  $('.color-5-hex').text(palette[4])
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

$('.project-list').on('click', '#trash-can', deletePalette)

$('.project-list').on('click', 'li', (e) => {
  const palette = $(e.target).parent().attr('alt').split(' ')
  displaySavedPalette(palette)
})
