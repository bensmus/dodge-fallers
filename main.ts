const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_STEP_SIZE = 10;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

type KeydownStates = {
  [key: string]: boolean
}

const gamestate = {
  gameObjectManager: new GameObjectManager(new Player(0, 0), []),
  keydownStates: {
    'a': false,
    'd': false,
    'w': false,
    's': false
  } as KeydownStates
};

addEventListener('keydown', (event) => {
  gamestate.keydownStates[event.key] = true;
});

addEventListener('keyup', (event) => {
  gamestate.keydownStates[event.key] = false;
})


function move() {
  let dColumn = 0;
  let dRow = 0;

  if (gamestate.keydownStates['a']) {
    dColumn = -1;
  }
  else if (gamestate.keydownStates['d']) {
    dColumn = 1;
  }
  else if (gamestate.keydownStates['w']) {
    dRow = -1;
  }
  else if (gamestate.keydownStates['s']) {
    dRow = 1;
  }
  else {
    return;
  }
  gamestate.gameObjectManager.handlePlayerMove(dColumn, dRow);
}

// setInterval(() => {
//   populateObstacles(gamestate.grid, 4); // 4 filled in grid squares
// }, 500)

function render() {
  move();
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gamestate.gameObjectManager.draw()
  window.requestAnimationFrame(render);
}

render();

