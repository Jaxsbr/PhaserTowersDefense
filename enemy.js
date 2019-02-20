class Enemy {
  constructor(sprite, originalWayPoints) {
    this.sprite = sprite;
    this.originalWayPoints = originalWayPoints;
    this.gameScene = game.scene.scenes[1];
    this.init();
  }

  init() {
    this.wayPointReachedThreshold = 2;
    this.movements = { left: false, right: false, up: false, down: false };

    this.activate(false);

    this.distance = 0;
    this.direction = new Phaser.Geom.Point(0, 0);
    this.directionVector = new Phaser.Math.Vector2(0, 0);
    this.normalized = new Phaser.Math.Vector2(0, 0);
    this.velocity = new Phaser.Math.Vector2(0, 0);
  }

  update() {
    let lastWaypoint = false;
    if (this.waypoints.length <= 0) {
      lastWaypoint = true;
    }

    if (!this.alive) {
      return;
    }

    if (!this.next) {
      let firstWayPoint = this.waypoints.shift();
      this.setNextWayPoint(firstWayPoint);
    }

    this.updateCenter();
    // TODO:
    // use SubtractPoints in game objects instead
    this.direction = this.subtractPoints(this.center, this.next);
    this.distance = Phaser.Geom.Point.GetMagnitude(this.direction);

    if (this.nextWayPointReached(this.distance)) {
      if (lastWaypoint) {
        this.next = null;
        this.activate(false);
        return;
      } else {
        this.setNextWayPoint(this.waypoints.shift());
        // TODO:
        // use SubtractPoints in game objects instead
        this.direction = this.subtractPoints(this.center, this.next);
      }
    }

    this.directionVector.x = this.direction.x;
    this.directionVector.y = this.direction.y;
    this.normalized = this.directionVector.normalize();

    if (!isNaN(this.normalized.x) && !isNaN(this.normalized.y)) {
      this.setVelocity(
        this.normalized.x * this.moveSpeed,
        this.normalized.y * this.moveSpeed
      );

      this.setMoveDirection();
    }

    this.applyVelocity();
    this.updateAnimation();
  }

  setNextWayPoint(wayPoint) {
    let bounds = this.gameScene.tiles[wayPoint.y][wayPoint.x].tileBounds;
    let next = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetNext(next);
  }

  updateCenter() {
    let bounds = this.sprite.getBounds();
    let center = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetCenter(center);
  }

  subtractPoints(fromPoint, toPoint) {
    // TODO:
    // Remove function, this has found in the game object
    let temp = Phaser.Geom.Point.Clone(toPoint);
    temp.x -= fromPoint.x;
    temp.y -= fromPoint.y;

    return temp;
  }

  nextWayPointReached(distanceToWayPoint) {
    return distanceToWayPoint < this.wayPointReachedThreshold;
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  applyVelocity() {
    this.sprite.y += this.velocity.y;
    this.sprite.x += this.velocity.x;
  }

  assignOrSetNext(point) {
    // This function will only re-assign a point if it's undefined.
    // If however the point is not undefined, we re-use by assigning x and y.
    // This is done to improve memory usage performance.
    if (!this.next) {
      this.next = point;
    } else {
      this.next.x = point.x;
      this.next.y = point.y;
    }
  }

  assignOrSetCenter(point) {
    // This function will only re-assign a point if it's undefined.
    // If however the point is not undefined, we re-use by assigning x and y.
    // This is done to improve memory usage performance.
    if (!this.center) {
      this.center = point;
    } else {
      this.center.x = point.x;
      this.center.y = point.y;
    }
  }

  reset(startPoint, hp, moveSpeed) {
    this.sprite.y = startPoint.y;
    this.sprite.x = startPoint.x;
    this.hp = hp;
    this.moveSpeed = moveSpeed;

    this.waypoints = this.originalWayPoints.slice();
    this.setVelocity(0, 0);
  }

  activate(active) {
    this.alive = active;
    this.sprite.active = active;
    this.sprite.visible = active;
  }

  setMoveDirection() {
    this.movements.left = this.velocity.x < 0;
    this.movements.right = this.velocity.x > 0;

    this.movements.up = this.velocity.y < 0;
    this.movements.down = this.velocity.y > 0;

    if (
      (this.movements.left || this.movements.right) &&
      (this.movements.up || this.movements.down)
    ) {
      // We detect if both horizontal and vertical movement is set.
      // As we can only play one animation per axis movement we should determine
      // what axis has the greater velocity value and use that as the direction.

      let horizontalValue =
        this.velocity.x < 0 ? this.velocity.x * -1 : this.velocity.x;

      let verticalValue =
        this.velocity.y < 0 ? this.velocity.y * -1 : this.velocity.y;

      if (horizontalValue > verticalValue) {
        this.movements.left = this.velocity.x < 0;
        this.movements.right = this.velocity.x > 0;
        this.movements.up = false;
        this.movements.down = false;
      } else {
        this.movements.up = this.velocity.y < 0;
        this.movements.down = this.velocity.y > 0;
        this.movements.left = false;
        this.movements.right = false;
      }
    }
  }

  updateAnimation() {
    if (this.movements.left) {
      this.sprite.anims.play('squidLeft', true);
    }

    if (this.movements.right) {
      this.sprite.anims.play('squidRight', true);
    }

    if (this.movements.up) {
      this.sprite.anims.play('squidUp', true);
    }

    if (this.movements.down) {
      this.sprite.anims.play('squidDown', true);
    }
  }
}
