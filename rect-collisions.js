"use strict";
class Rect {
    constructor(xleft, ytop, width, height) {
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
    shift(dx, dy) {
        return new Rect(this.xleft + dx, this.ytop + dy, this.width, this.height);
    }
    blockedBy(other, dx, dy) {
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
        return true;
    }
    getMovementSegments(dx, dy) {
        const segs = [];
        for (const point of this.points) {
            segs.push({
                point1: { x: point.x, y: point.y },
                point2: { x: point.x + dx, y: point.y + dy },
                horizontal: dy == 0
            });
        }
        return segs;
    }
}
function intersect(seg1, seg2) {
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
function straddles(range, value) {
    return value >= Math.min(...range) && value <= Math.max(...range);
}
