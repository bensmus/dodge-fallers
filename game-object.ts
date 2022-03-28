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
  width?: number;
  height?: number;
  color: string = 'black';
  constructor(row: number, column: number, width?: number, height?: number) {
    this.row = row;
    this.column = column;
    this.width = width;
    this.height = height;
  }
}

class GameObjectManager {
  player: GameObject;
  collidables: GameObject[];
  
  constructor(player: GameObject, collidables: GameObject[]) {
    this.player = player;
    this.collidables = collidables;
  }
  
  draw() {
    const allGameObjects: GameObject[] = Array.prototype.concat([this.player], this.collidables)
    allGameObjects.forEach((obj: GameObject) => {
      ctx.fillStyle = obj.color;
      ctx.fillRect(
        obj.row * GRID_STEP_SIZE,
        obj.column * GRID_STEP_SIZE,
        obj.width ? obj.width * GRID_STEP_SIZE : GRID_STEP_SIZE,
        obj.height ? obj.height * GRID_STEP_SIZE : GRID_STEP_SIZE
      )
    })
  }
  
  handlePlayerMove(dRow: number, dColumn: number) {
    const potentialRow = this.player.row + dRow;
    const potentialColumn = this.player.column + dColumn;
    console.log(potentialRow, potentialColumn);
    console.log(CANVAS_WIDTH / GRID_STEP_SIZE);
    
    // out of bounds check
    if (
      potentialRow < 0 || 
      potentialRow > (CANVAS_HEIGHT / GRID_STEP_SIZE - 1) || 
      potentialColumn < 0 ||
      potentialColumn > (CANVAS_WIDTH / GRID_STEP_SIZE - 1)
      ) {
        return;
    }
    // collision check
    this.collidables.forEach(collidable => {
      if (collidable.row == potentialRow && collidable.column == potentialColumn) {
        return;
      }
    })
    this.player.row = potentialRow;
    this.player.column = potentialColumn;
  } 
}