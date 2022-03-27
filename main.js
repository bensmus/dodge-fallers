"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GRID_STEP_SIZE = 5;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const gamestate = {
    grid: new Grid(GRID_STEP_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT),
    keydownStates: {
        'a': false,
        'd': false,
        'w': false,
        's': false
    }
};
addEventListener('keydown', (event) => {
    gamestate.keydownStates[event.key] = true;
});
addEventListener('keyup', (event) => {
    gamestate.keydownStates[event.key] = false;
});
function move() {
    let dx = 0;
    let dy = 0;
    if (gamestate.keydownStates['a']) {
        dx = -1;
    }
    else if (gamestate.keydownStates['d']) {
        dx = 1;
    }
    else if (gamestate.keydownStates['w']) {
        dy = -1;
    }
    else if (gamestate.keydownStates['s']) {
        dy = 1;
    }
    else {
        return;
    }
    movementRequestHandle(gamestate.grid, dx, dy);
}
setInterval(() => {
    populateObstacles(gamestate.grid, 4); // 4 filled in grid squares
}, 500);
function render() {
    move();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw(gamestate.grid);
    window.requestAnimationFrame(render);
}
render();
