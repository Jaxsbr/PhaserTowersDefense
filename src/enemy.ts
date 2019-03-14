import { Global } from './global';
import { GameScene } from './scenes/gameScene';

export class Enemy {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private gameScene: GameScene;
  private originalWayPoints: any;
  private waypoints: any;
  public alive: boolean;  
  private hp: number;
  private moveSpeed: number;
  public center: Phaser.Geom.Point;
  private next: Phaser.Geom.Point;
  private distance: number;
  private direction: Phaser.Geom.Point;
  private directionVector: Phaser.Math.Vector2;
  private normalized: Phaser.Math.Vector2;
  private velocity: Phaser.Math.Vector2;
  private wayPointReachedThreshold: number;
  private movements: any;

  constructor(sprite:Phaser.GameObjects.Sprite, originalWayPoints:any) {
    this.sprite = sprite;
    this.originalWayPoints = originalWayPoints;
    this.init();
  }

  init(): void {
    this.wayPointReachedThreshold = 0.5;
    this.movements = { left: false, right: false, up: false, down: false };

    this.activate(false);

    this.center = new Phaser.Geom.Point(0, 0);
    this.distance = 0;
    this.direction = new Phaser.Geom.Point(0, 0);
    this.directionVector = new Phaser.Math.Vector2(0, 0);
    this.normalized = new Phaser.Math.Vector2(0, 0);
    this.velocity = new Phaser.Math.Vector2(0, 0);

    this.gameScene = this.global.game.scene.scenes[1];
  }

  update(): void {
    let lastWaypoint = false;
    if (this.waypoints.length <= 0) {
      lastWaypoint = true;
    }

    if (!this.alive) {
      return;
    }

    if (!this.alive) {
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
        // us SubtractPoints in game object instead
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

  updateCenter(): void {
    let bounds = this.sprite.getBounds();
    let center = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetCenter(center);
  }

  subtractPoints(fromPoint: Phaser.Geom.Point, toPoint: Phaser.Geom.Point) {
    // TODO:
    // Remove function, this has found in the game object
    let temp = Phaser.Geom.Point.Clone(toPoint);
    temp.x -= fromPoint.x;
    temp.y -= fromPoint.y;

    return temp;
  }

  nextWayPointReached(distanceToWayPoint: number) {
    return distanceToWayPoint < this.wayPointReachedThreshold;
  }

  setVelocity(x: number, y: number): void {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  applyVelocity(): void {
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

  reset(startPoint: any, hp: number, moveSpeed: number): void {
    this.sprite.y = startPoint.y;
    this.sprite.x = startPoint.x;
    this.hp = hp;
    this.moveSpeed = moveSpeed;

    this.waypoints = this.originalWayPoints.slice();
    this.setVelocity(0, 0);
  }

  activate(active: boolean): void {
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
