import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';
import { ProjectileConfig } from './objects/projectileConfig';

export class Tower {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private gameScene: GameScene;
  public targetEnemy: Enemy;
  private targetDirection: Phaser.Geom.Point;
  private range: number;
  public center: Phaser.Geom.Point;
  private rotation: number;
  private shootRate: number;
  private elapsedShootTime: number;
  private enemyInRange: boolean;

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number, global: Global) {    
    this.sprite = sprite;
    this.global = global;
    this.init(tileX, tileY);
  }

  init(tileX: number, tileY: number): void {    
    this.gameScene = this.global.game.scene.scenes[1];
    this.sprite.scaleX = 1;
    this.sprite.scaleY = 1;
    this.sprite.anims.play('towerPlainIdle');

    let position = this.gameScene.tiles[tileY][tileX].tileBounds;
    this.sprite.y = position.y + 16;
    this.sprite.x = position.x + 16;
    this.range = 64;

    this.shootRate = this.global.level.plainTowerShootRate;
    this.elapsedShootTime = 0;
  }

  update(delta: number): void {
    // debugger;
    this.updateCenter();
    this.updateEnemyInRange();
    this.updateRotation();
    this.updateShootRate(delta);
  }

  updateCenter(): void {
    let bounds = this.sprite.getBounds();
    let center = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetCenter(center);
  }

  updateEnemyInRange(): void {
    if (this.targetEnemy != null && this.targetEnemy.alive) {
      this.targetDirection = this.global.subtractPoints(this.center, this.targetEnemy.center);
      let distance = Phaser.Geom.Point.GetMagnitude(this.targetDirection);
      if (distance <= this.range) {
        this.enemyInRange = true;
        return;
      }      
    }

    this.enemyInRange = false;
  }

  updateRotation(): void {
    // Rotate the tower towards it's current target or
    // rotate to default position if no target exist or if target not in range.
    if (this.enemyInRange) {
      var xDistance = this.targetEnemy.center.x - this.center.x;
      var yDistance = this.targetEnemy.center.y - this.center.y;
      this.rotation = Math.atan2(yDistance, xDistance) * (180 / Math.PI);
    } else {
        if (this.rotation > 0) {
          this.rotation = this.rotation - 0.01;
        } else {
          this.rotation = 0;
        }
    }

    this.sprite.angle = this.rotation;
  }

  updateShootRate(delta): void {
    this.elapsedShootTime += delta;
    if (this.elapsedShootTime >= this.shootRate) {
      if (this.enemyInRange) {
        console.log("shoot...");
        this.elapsedShootTime = 0;
        this.shoot();
      }
    }
  }

  assignOrSetCenter(point: Phaser.Geom.Point): void {
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

  shoot(): void {
    var projectileConfig = {      
      bounds: new Phaser.GameObjects.Rectangle(this.gameScene, 0,0,0,0, 0xff0000, 1),
      position: new Phaser.Math.Vector2(this.sprite.x, this.sprite.y),
      rotation: 0,
      moveSpeed: 5,      
      direction: this.targetDirection
    } as ProjectileConfig;

    var createProjectileEvent = new CustomEvent(
      'createProjectileRequest', { 
        detail: projectileConfig });

    window.dispatchEvent(createProjectileEvent);
    console.log('createProjectileRequest event raised');
  }
}
