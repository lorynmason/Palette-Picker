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

$('.new-palette').on('click', randomPalette)

$('i').on('click', (e) => {
  if($(e.target).hasClass('fa-unlock')) {
    $(e.target).removeClass('fa-unlock').addClass('fa-lock')
  } else {
    $(e.target).removeClass('fa-lock').addClass('fa-unlock')
  }
})
