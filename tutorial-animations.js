const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const MOVE_SIZE = 5
const CHARACTER_WIDTH = 10;
const CHARACTER_HEIGHT = 10;

/************
 * Falling square
 ***********/
// function fall(frame = 0) {
//   console.log('frame#: ', frame)
//   ctx.clearRect(0, 0, 300, 300)
//   ctx.fillRect(10, frame, 10, 10)
//   window.requestAnimationFrame(() => fall(frame+1))
// }
// fall()

/**
 * Character position in canvas coordinates
 */
let pos = {
  x: 0,
  y: 0
}

/**
 * WASD handlers
 */
addEventListener('keydown', (e) => {
  if (e.key == 'w' && pos.y > 0) {
    pos.y -= MOVE_SIZE
  }
  if (e.key == 'a' && pos.x > 0) {
    pos.x -= MOVE_SIZE
  }
  if (e.key == 's' && pos.y + CHARACTER_HEIGHT < GAME_HEIGHT) {
    pos.y += MOVE_SIZE
  }
  if (e.key == 'd' && pos.x + CHARACTER_WIDTH < GAME_WIDTH) {
    pos.x += MOVE_SIZE
  }
})

function render(pos) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  ctx.fillRect(pos.x, pos.y, 10, 10)
  window.requestAnimationFrame(() => render(pos))
}

canvas.width = 500;
canvas.height = 500;
render(pos)