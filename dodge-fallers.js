const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const MOVE_SIZE = 5
const CHARACTER_WIDTH = 10
const CHARACTER_HEIGHT = 10

const gamestate = {
  pos: {x: 0, y: 0},
  collidables: [
    {x: 0, y: 0, width: GAME_WIDTH, height: 0},
    {x: 0, y: GAME_HEIGHT, width: GAME_WIDTH, height: 0},
    {x: 0, y: 0, width: 0, height: GAME_HEIGHT},
    {x: GAME_WIDTH, y: 0, width: 0, height: GAME_HEIGHT},
  ]
}

addEventListener('keydown', (event) => {
  handleKeydown(event)
})

function handleKeydown(event) {
  if (event.key == 'a') {
    futurepos = {x: gamestate.pos.x - MOVE_SIZE, y: gamestate.pos.y}
  }
  else if (event.key == 'd') {
    futurepos = {x: gamestate.pos.x + MOVE_SIZE, y: gamestate.pos.y}
  }
  else if (event.key == 'w') {
    futurepos = {x: gamestate.pos.x, y: gamestate.pos.y - MOVE_SIZE}
  }
  else if (event.key == 's') {
    futurepos = {x: gamestate.pos.x, y: gamestate.pos.y + MOVE_SIZE}
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

function noCollision(currentpos, futurepos, collidables) {
  for (const collidable of collidables) {
    if (collision(currentpos, futurepos, collidable)) {
      return false;
    }
  }
  return true;
}

/**
 * Does collidable block path?
 */
function collision(currentpos, futurepos, collidable) {
  let path = [currentpos, futurepos]
  const {x, y, width, height} = collidable;
  // perimeter lines of collidable
  const topln = [{x: x, y: y}, {x: x + width, y: y}]
  const botln = [{x: x, y: y + height}, {x: x + top, y: y + height}]
  const leftln = [{x: x, y: y}, {x: x, y: y + height}]
  const rightln = [{x: x + width, y: y}, {x: x + width, y: y + height}]
  
  if (intersectHorizontal(path, topln)) {
    return true
  }
  if (intersectHorizontal(path, botln)) {
    return true
  }
  if (intersectVertical(path, leftln)) {
    return true
  }
  if (intersectVertical(path, rightln)) {
    return true
  }
  return false
}

function intersectHorizontal(path, ln) {
  if (overlap([path[0].x, path[1].x], [ln[0].x, ln[1].x])) {
    if (straddles([path[0].y, path[1].y], ln[0].y)) {
      return true
    }
  }
  return false
}

function intersectVertical(path, ln) {
  if (overlap([path[0].y, path[1].y], [ln[0].y, ln[1].y])) {
    if (straddles([path[0].x, path[1].x], ln[0].x)) {
      return true
    }
  }
  return false
}

function overlap(range1, range2) {
  if (Math.max(...range1) > Math.max(...range2)) {
    if (straddles(range1, Math.max(...range2))) {
      return true
    }
  }
  return false
}

function straddles(range, value) {
  return value > Math.min(range) && value < Math.max(range)
}

function render() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  ctx.fillRect(gamestate.pos.x, gamestate.pos.y, 10, 10)
  window.requestAnimationFrame(render)
}

canvas.width = GAME_WIDTH
canvas.height = GAME_HEIGHT
render()