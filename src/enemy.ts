import { Global } from './global';

export class Enemy {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private originalWayPoints: any;
  private waypoints: any;
  private alive: boolean;  
  private hp: number;
  private moveSpeed: number;
  private center: Phaser.Geom.Point;
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
  }

  activate(active: boolean): void {
    this.alive = active;
    this.sprite.active = active;
    this.sprite.visible = active;
  }

  reset(startPoint: any, hp: number, moveSpeed: number): void {
    this.sprite.y = startPoint.y;
    this.sprite.x = startPoint.x;
    this.hp = hp;
    this.moveSpeed = moveSpeed;

    this.waypoints = this.originalWayPoints.slice();
    this.setVelocity(0, 0);
  }

  setVelocity(x: number, y: number): void {
    this.velocity.x = x;
    this.velocity.y = y;
  }
}
