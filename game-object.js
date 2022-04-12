"use strict";
class Player {
    constructor(row, column, width, height) {
        this.color = 'black';
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
    }
}
class Collidable {
    constructor(row, column, width, height) {
        this.color = 'red';
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
    }
}
class GameObjectManager {
    constructor(player, collidables) {
        this.player = player;
        this.collidables = collidables;
    }
    draw() {
        const allGameObjects = Array.prototype.concat([this.player], this.collidables);
        allGameObjects.forEach((obj) => {
            ctx.fillStyle = obj.color;
            ctx.fillRect(obj.column * GRID_STEP_SIZE, obj.row * GRID_STEP_SIZE, obj.width ? obj.width * GRID_STEP_SIZE : GRID_STEP_SIZE, obj.height ? obj.height * GRID_STEP_SIZE : GRID_STEP_SIZE);
        });
    }
}
