//! This should work for all four points of character, not just topleft
//! Then you can change the straddles to use more sane logic and allow movement along obstacles

function noCollision(currentPoint, futurePoint, collidables) {
  for (const collidable of collidables) {
    if (collision(currentPoint, futurePoint, collidable)) {
      return false;
    }
  }
  return true;
}

/**
 * Does collidable block point path
 */
function collision(currentPoint, futurePoint, collidable) {
  let path = [currentPoint, futurePoint]
  const { x, y, width, height } = collidable;
  // perimeter lines of collidable
  const topln = [{ x: x, y: y }, { x: x + width, y: y }]
  const botln = [{ x: x, y: y + height }, { x: x + width, y: y + height }]
  const leftln = [{ x: x, y: y }, { x: x, y: y + height }]
  const rightln = [{ x: x + width, y: y }, { x: x + width, y: y + height }]

  if (intersectHorizontal(path, topln)) {
    console.log('collides with top of collidable', path, topln)
    return true
  }
  if (intersectHorizontal(path, botln)) {
    console.log('collides with bottom of collidable', path, botln)
    return true
  }
  if (intersectVertical(path, leftln)) {
    console.log('collides with left of collidable', path, leftln)
    return true
  }
  if (intersectVertical(path, rightln)) {
    console.log('collides with right of collidable', path, rightln)
    return true
  }
  return false
}

function intersectHorizontal(path, ln) {
  if (overlap([path[0].x, path[1].x], [ln[0].x, ln[1].x])) {
    if (straddles([path[0].y, path[1].y], ln[0].y)) {
      return true
    }
  }
  return false
}

function intersectVertical(path, ln) {
  if (overlap([path[0].y, path[1].y], [ln[0].y, ln[1].y])) {
    if (straddles([path[0].x, path[1].x], ln[0].x)) {
      return true
    }
  }
  return false
}

function overlap(range1, range2) {
  if (Math.max(...range1) > Math.max(...range2)) {
    if (straddles(range1, Math.max(...range2))) {
      return true
    }
  } else {
    if (straddles(range2, Math.max(...range1))) {
      return true
    }
  }
  return false
}

function straddles(range, value) {
  return value >= Math.min(...range) && value <= Math.max(...range)
}
