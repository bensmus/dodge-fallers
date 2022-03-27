"use strict";
class Grid {
    constructor(gridStepSize, canvasWidth, canvasHeight) {
        this.internalArray = [];
        const columnCount = Math.floor(canvasWidth / gridStepSize);
        const rowCount = Math.floor(canvasHeight / gridStepSize);
        for (let i = 0; i < rowCount; i++) {
            const row = [];
            for (let j = 0; j < columnCount; j++) {
                row.push(null);
            }
            this.internalArray.push(row);
        }
        // console.log('grid created')
        // console.log(grid)
    }
}
const grid = new Grid(1, 10, 10);
