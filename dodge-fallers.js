const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const MOVE_SIZE = 5
const CHARACTER_WIDTH = 10
const CHARACTER_HEIGHT = 10

const gamestate = {
  // ! pos is not good. Use instance of a playerPoints object that has many points and can be 
  // ! easily shifted up or down
  pos: { x: 10, y: 10 },
  collidables: [
    { x: 0, y: 0, width: GAME_WIDTH, height: 0 },
    { x: 0, y: GAME_HEIGHT, width: GAME_WIDTH, height: 0 },
    { x: 0, y: 0, width: 0, height: GAME_HEIGHT },
    { x: GAME_WIDTH, y: 0, width: 0, height: GAME_HEIGHT },
  ]
}

addEventListener('keydown', (event) => {
  handleKeydown(event)
})

function handleKeydown(event) {
  if (event.key == 'a') {
    futurepos = { x: gamestate.pos.x - MOVE_SIZE, y: gamestate.pos.y }
  }
  else if (event.key == 'd') {
    futurepos = { x: gamestate.pos.x + MOVE_SIZE, y: gamestate.pos.y }
  }
  else if (event.key == 'w') {
    futurepos = { x: gamestate.pos.x, y: gamestate.pos.y - MOVE_SIZE }
  }
  else if (event.key == 's') {
    futurepos = { x: gamestate.pos.x, y: gamestate.pos.y + MOVE_SIZE }
  }
  else {
    return;
  }
  // a valid key was pressed, but maybe we are moving through a collidable
  if (noCollision(gamestate.pos, futurepos, gamestate.collidables)) {
    gamestate.pos = futurepos;
  } else {
    return;
  }
}

function render() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  ctx.fillRect(gamestate.pos.x, gamestate.pos.y, 10, 10)
  window.requestAnimationFrame(render)
}

canvas.width = GAME_WIDTH
canvas.height = GAME_HEIGHT
render()