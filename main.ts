const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const MOVE_SIZE = 5;


const gamestate = {
  player: new Rect(10, 10, 10, 10),
  collidables: [
    new Rect(0, 0, GAME_WIDTH, 0),
    new Rect(0, GAME_HEIGHT, GAME_WIDTH, 0),
    new Rect(0, 0, 0, GAME_HEIGHT),
    new Rect(GAME_WIDTH, 0, 0, GAME_HEIGHT),
  ]
};

addEventListener('keydown', (event) => {
  handleKeydown(event);
});

function handleKeydown(event: KeyboardEvent) {
  let dx = 0;
  let dy = 0;

  if (event.key == 'a') {
    dx = MOVE_SIZE;
  }
  else if (event.key == 'd') {
    dx = -MOVE_SIZE;
  }
  else if (event.key == 'w') {
    dy = -MOVE_SIZE;
  }
  else if (event.key == 's') {
    dy = MOVE_SIZE;
  }
  else {
    return;
  }
  for (const collidable of gamestate.collidables) {
    if (gamestate.player.blockedBy(collidable, dx, dy)) {
      return;
    }
  }
  gamestate.player = gamestate.player.shift(dx, dy);
}

function render() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillRect(
    gamestate.player.topleft.x,
    gamestate.player.topleft.y,
    gamestate.player.width,
    gamestate.player.width
  );
  window.requestAnimationFrame(render);
}

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
render();