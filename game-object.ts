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

class Collidable {
  row: number;
  column: number;
  width?: number;
  height?: number;
  color: string = 'red';

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
        obj.column * GRID_STEP_SIZE,
        obj.row * GRID_STEP_SIZE,
        obj.width ? obj.width * GRID_STEP_SIZE : GRID_STEP_SIZE,
        obj.height ? obj.height * GRID_STEP_SIZE : GRID_STEP_SIZE
      )
    })
  }
}
