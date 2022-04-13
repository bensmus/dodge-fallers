"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const TILE_SIZE = 15;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
function drawTile(tile) {
    ctx.fillStyle = tile.color;
    ctx.fillRect(tile.column * TILE_SIZE, tile.row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
const player = { column: 0, row: 0, color: 'black' };
const collidables = [[11, 9], [12, 10], [4, 5], [5, 5]].map(location => ({ column: location[0], row: location[1], color: 'red' }));
const gameInternal = {
    heldKey: '',
    motionDestination: null,
};
function approx(a, b) {
    return Math.abs(a - b) < 0.1;
}
addEventListener('keyup', (event) => {
    if (gameInternal.heldKey === event.key) {
        gameInternal.heldKey = '';
    }
});
addEventListener('keydown', (event) => {
    gameInternal.heldKey = event.key;
});
/**
 * key is held and
 * not in the middle of a motion animation and
 * no collisions
 *
 * -> initiate player move (set new motionDestination)
 */
function updateMotionDestination() {
    if (!gameInternal.motionDestination) {
        if (gameInternal.heldKey === 'w') {
            gameInternal.motionDestination = { column: player.column, row: player.row - 1 };
        }
        if (gameInternal.heldKey === 'a') {
            gameInternal.motionDestination = { column: player.column - 1, row: player.row };
        }
        if (gameInternal.heldKey === 's') {
            gameInternal.motionDestination = { column: player.column, row: player.row + 1 };
        }
        if (gameInternal.heldKey === 'd') {
            gameInternal.motionDestination = { column: player.column + 1, row: player.row };
        }
        // does collidables occupy space we are moving into
        if (gameInternal.motionDestination && collidables.find(collidable => (collidable.row == gameInternal.motionDestination.row && collidable.column == gameInternal.motionDestination.column))) {
            gameInternal.motionDestination = null;
        }
    }
}
/**
 * based on motionDestination
 *
 * when arives to motionDestination, return null,
 * this signifies that we have completed motion animation
 */
function updatePlayerPos() {
    if (gameInternal.motionDestination) {
        const { column, row } = gameInternal.motionDestination;
        if (approx(player.column, column) && approx(player.row, row)) {
            player.column = column;
            player.row = row;
            gameInternal.motionDestination = null;
        }
        player.column += Math.sign(column - player.column) * 0.05;
        player.row += Math.sign(row - player.row) * 0.05;
    }
}
function drawGrid(ctx) {
    for (let x = 0; x < CANVAS_WIDTH; x += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
    }
}
setInterval(updatePlayerPos, 10);
function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // drawGrid(ctx);
    collidables.concat([player]).forEach(tile => drawTile(tile));
    updateMotionDestination();
    window.requestAnimationFrame(render);
}
render();
