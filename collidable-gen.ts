/**
 * Adds between 1 and 4 collidables
 */
function addObstacle(collidables: Rect[]) {
  const count = Math.random() * 4;
  let currentx = Math.random() * GAME_WIDTH;
  let currenty = Math.random() * GAME_HEIGHT;
  let currentWidth = Math.random() * 20;
  let currentHeight = Math.random() * 20;
  for (let i = 0; i < count; i++) {
    collidables.push(new Rect(currentx, currenty, currentWidth, currentHeight));
    currentx += ((Math.random() - 0.5) * 2) * currentWidth;
    currenty += ((Math.random() - 0.5) * 2) * currentHeight;
    currentWidth = Math.random() * 100;
    currentHeight = Math.random() * 100;
  }
}