"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const MOVE_SIZE = 5;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const gamestate = {
    player: new Rect(10, 10, 10, 10),
    collidables: [
        new Rect(0, 0, GAME_WIDTH, 0),
        new Rect(0, GAME_HEIGHT, GAME_WIDTH, 0),
        new Rect(0, 0, 0, GAME_HEIGHT),
        new Rect(GAME_WIDTH, 0, 0, GAME_HEIGHT),
    ],
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
        dx = -MOVE_SIZE;
    }
    else if (gamestate.keydownStates['d']) {
        dx = MOVE_SIZE;
    }
    else if (gamestate.keydownStates['w']) {
        dy = -MOVE_SIZE;
    }
    else if (gamestate.keydownStates['s']) {
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
setInterval(() => {
    addObstacle(gamestate.collidables);
}, 500);
function render() {
    move();
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    gamestate.player.draw(ctx, 'black');
    for (const collidable of gamestate.collidables) {
        collidable.draw(ctx, 'red');
    }
    window.requestAnimationFrame(render);
}
render();
