const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_STEP_SIZE = 15;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

interface Gamestate {
  gameObjectManager: GameObjectManager,
  heldKey: string,
  motionDestination: null | number[]
}

const gamestate: Gamestate = {
  gameObjectManager: new GameObjectManager(new Player(0, 0), [
    new Collidable(11,9),
    new Collidable(12,10),
    new Collidable(13,11),
    new Collidable(14,12),
  ]),
  heldKey: '',
  motionDestination: null
};

function approx(a: number, b: number) {
  return Math.abs(a - b) < 0.1
}

addEventListener('keyup', (event) => {
  if (gamestate.heldKey === event.key) {
    gamestate.heldKey = ''
  }
})

addEventListener('keydown', (event) => {
 gamestate.heldKey = event.key;
});

const PIXELS_PER_SECOND = 500

/**
 * key is held and 
 * not in the middle of a motion animation and 
 * no collisions 
 * 
 * -> initiate player move (set new motionDestination)
 */

function updateMotionDestination() { // ! Terribly written function
  if (gamestate.motionDestination === null) {
    if (gamestate.heldKey === 'w') {
      gamestate.motionDestination = [gamestate.gameObjectManager.player.column, gamestate.gameObjectManager.player.row - 1] 
    }
    if (gamestate.heldKey === 'a') {
      gamestate.motionDestination = [gamestate.gameObjectManager.player.column - 1, gamestate.gameObjectManager.player.row] 
    }
    if (gamestate.heldKey === 's') {
      gamestate.motionDestination = [gamestate.gameObjectManager.player.column, gamestate.gameObjectManager.player.row + 1] 
    }
    if (gamestate.heldKey === 'd') {
      gamestate.motionDestination = [gamestate.gameObjectManager.player.column + 1, gamestate.gameObjectManager.player.row] 
    }
    if (gamestate.motionDestination && gamestate.gameObjectManager.collidables.find(collidable => ( // space is occupied
      collidable.row == gamestate.motionDestination[1] && collidable.column == gamestate.motionDestination[0])
      )) {
      gamestate.motionDestination = null;
    } 
  }
}

/**
 * based on motionDestination
 * 
 * when arives to motionDestination, set it to null
 * so that it signifies that we have completed motion animation
 */
function updatePlayerPos() {
  if (gamestate.motionDestination) {
    const [col, row] = gamestate.motionDestination;
    if (approx(gamestate.gameObjectManager.player.column, col) && approx(gamestate.gameObjectManager.player.row, row)) {
      gamestate.gameObjectManager.player.column = col;
      gamestate.gameObjectManager.player.row = row;
      gamestate.motionDestination = null;
    }
    gamestate.gameObjectManager.player.column += Math.sign(col - gamestate.gameObjectManager.player.column) * 0.05;
    gamestate.gameObjectManager.player.row += Math.sign(row - gamestate.gameObjectManager.player.row) * 0.05;
  }
}

function drawGrid(ctx: CanvasRenderingContext2D) {
  for (let x = 0; x < CANVAS_WIDTH; x += GRID_STEP_SIZE)  {
    ctx.beginPath()
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CANVAS_HEIGHT);
    ctx.stroke()
  }
  for (let y = 0; y < CANVAS_HEIGHT; y += GRID_STEP_SIZE)  {
    ctx.beginPath()
    ctx.moveTo(0, y);
    ctx.lineTo(CANVAS_WIDTH, y);
    ctx.stroke()
  }
}

setInterval(updatePlayerPos, 10)

function render() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // drawGrid(ctx);
  gamestate.gameObjectManager.draw()
  updateMotionDestination()
  window.requestAnimationFrame(render);
}

render();
