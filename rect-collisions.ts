interface Point {
  x: number,
  y: number;
}

interface Segment {
  point1: Point,
  point2: Point,
  horizontal: boolean;
}

class Rect {
  xleft: number;
  ytop: number;
  width: number;
  height: number;

  topleft: Point;
  topright: Point;
  bottomright: Point;
  bottomleft: Point;
  points: Point[];

  top: Segment;
  right: Segment;
  bottom: Segment;
  left: Segment;
  segments: Segment[];

  constructor(xleft: number, ytop: number, width: number, height: number) {
    this.xleft = xleft;
    this.ytop = ytop;
    this.width = width;
    this.height = height;

    this.topleft = { x: xleft, y: ytop };
    this.topright = { x: xleft + width, y: ytop };
    this.bottomright = { x: xleft + width, y: ytop + height };
    this.bottomleft = { x: xleft, y: ytop + height };
    this.points = [this.topleft, this.topright, this.bottomright, this.bottomleft];

    this.top = { point1: this.topleft, point2: this.topright, horizontal: true };
    this.right = { point1: this.topright, point2: this.bottomright, horizontal: false };
    this.bottom = { point1: this.bottomleft, point2: this.bottomright, horizontal: true };
    this.left = { point1: this.topleft, point2: this.bottomleft, horizontal: false };
    this.segments = [this.top, this.right, this.bottom, this.left];
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(this.xleft, this.ytop, this.width, this.height);
  }
  
  shift(dx: number, dy: number) {
    return new Rect(this.xleft + dx, this.ytop + dy, this.width, this.height);
  }

  blockedBy(other: Rect, dx: number, dy: number) {
    // 1. Get point paths of every point in our points
    // 2. See if any point path intersects other
    const moveSegs = this.getMovementSegments(dx, dy);
    for (const m of moveSegs) {
      for (const s of other.segments) {
        if (intersect(m, s)) {
          return true;
        }
      }
    }
    return false;
  }

  getMovementSegments(dx: number, dy: number) {
    const segs: Segment[] = [];
    for (const point of this.points) {
      segs.push(
        {
          point1: { x: point.x, y: point.y },
          point2: { x: point.x + dx, y: point.y + dy },
          horizontal: dy == 0
        }
      );
    }
    return segs;
  }
}

function intersect(seg1: Segment, seg2: Segment) {
  if (seg1.horizontal) {
    if (seg2.horizontal) {
      return false;
    }
    // seg1 horizontal, seg2 vertical
    const xok = straddles([seg1.point1.x, seg1.point2.x], seg2.point1.x);
    const yok = straddles([seg2.point1.y, seg2.point2.y], seg1.point1.y);
    return xok && yok;
  }

  // seg1 vertical
  if (!seg2.horizontal) {
    return false;
  }

  // seg1 vertical, seg2 horizontal
  const xok = straddles([seg2.point1.x, seg2.point2.x], seg1.point1.x);
  const yok = straddles([seg1.point1.y, seg1.point2.y], seg2.point1.y);
  return xok && yok;
}

function straddles(range: number[], value: number) {
  return value >= Math.min(...range) && value <= Math.max(...range)
}