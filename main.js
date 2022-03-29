"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_STEP_SIZE = 20;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const MOVEMENT_REFRESH_MILLISECONDS = 50;
const gamestate = {
    gameObjectManager: new GameObjectManager(new Player(0, 0), []),
    heldKey: ''
};
addEventListener('keydown', (event) => {
    if (event.repeat) {
        return;
    }
    handleKeydown(event.key);
});
addEventListener('keyup', event => {
    gamestate.heldKey = '';
});
function handleKeydown(key) {
    switch (key) {
        case 'w':
            gamestate.gameObjectManager.handlePlayerMove(0, -1);
            gamestate.heldKey = 'w';
            break;
        case 'a':
            gamestate.gameObjectManager.handlePlayerMove(-1, 0);
            gamestate.heldKey = 'a';
            break;
        case 's':
            gamestate.gameObjectManager.handlePlayerMove(0, 1);
            gamestate.heldKey = 's';
            break;
        case 'd':
            gamestate.gameObjectManager.handlePlayerMove(1, 0);
            gamestate.heldKey = 'd';
            break;
    }
}
// setInterval(() => {
//   populateObstacles(gamestate.grid, 4); // 4 filled in grid squares
// }, 500)
function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gamestate.gameObjectManager.draw();
    window.requestAnimationFrame(render);
}
render();
