interface GameObject {
  row: number;
  column: number;
  width?: number;
  height?: number;
  color: string;
}

class Player {
  row: number;
  column: number;
  color: string = 'black';
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
}

class Grid {
  internalArray: Array<Array<null | GameObject>> = []
  ctx: CanvasRenderingContext2D;
  gridStepSize: number;
  
  constructor(gridStepSize: number, canvasWidth: number, canvasHeight: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.gridStepSize = gridStepSize;

    const columnCount = Math.floor(canvasWidth / gridStepSize);
    const rowCount = Math.floor(canvasHeight / gridStepSize);
    for (let i = 0; i < rowCount; i++) {
      const row: Array<null | GameObject> = [];
      for (let j = 0; j < columnCount; j++) {
        row.push(null);
      }
      this.internalArray.push(row);
    }

    this.internalArray
    console.log('created Grid', this.internalArray)
  }
  
  draw() {
    this.internalArray.forEach((row: Array<null | GameObject>) => {
      row.forEach((elem: null | GameObject) => {
        if (elem) {
          this.ctx.fillStyle = elem.color;
          this.ctx.fillRect(
            elem.row * this.gridStepSize, 
            elem.column * this.gridStepSize,
            elem.width! * this.gridStepSize || this.gridStepSize,
            elem.column! * this.gridStepSize || this.gridStepSize
          )
        }
      })
    })
  }
}
