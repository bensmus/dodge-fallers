const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_STEP_SIZE = 20;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const MOVEMENT_REFRESH_MILLISECONDS = 50;

const gamestate = {
  gameObjectManager: new GameObjectManager(new Player(0, 0), []),
  heldKey: '',
  interval: NaN
};

addEventListener('keydown', (event) => {
  if (event.repeat) {
    return;
  }
  gamestate.heldKey = event.key;
  if(move()) {
    clearInterval(gamestate.interval)
    gamestate.interval = setInterval(move, MOVEMENT_REFRESH_MILLISECONDS); 
  }
});

addEventListener('keyup', (event) => {
  if (event.key == gamestate.heldKey) {
    clearInterval(gamestate.interval)
  }
})

function move() {
  let dColumn = 0;
  let dRow = 0;

  if (gamestate.heldKey == 'a') {
    dColumn = -1;
    console.log('a')
  }
  else if (gamestate.heldKey == 'd') {
    dColumn = 1;
    console.log('d')
  }
  else if (gamestate.heldKey == 'w') {
    dRow = -1;
    console.log('w')
  }
  else if (gamestate.heldKey == 's') {
    dRow = 1;
    console.log('s')
  }
  else {
    return false;
  }
  console.log('moving')
  gamestate.gameObjectManager.handlePlayerMove(dColumn, dRow);
  return true;
}

// setInterval(() => {
//   populateObstacles(gamestate.grid, 4); // 4 filled in grid squares
// }, 500)

function render() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gamestate.gameObjectManager.draw()
  window.requestAnimationFrame(render);
}

render();
