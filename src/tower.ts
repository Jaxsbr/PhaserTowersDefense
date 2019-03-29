import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';

export class Tower {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private gameScene: GameScene;
  public targetEnemy: Enemy;
  private range: number;
  public center: Phaser.Geom.Point;
  private rotation: number;

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number) {    
    this.sprite = sprite;
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
  }

  update(): void {
    this.updateCenter();
    this.updateRotation();
  }

  updateCenter(): void {
    let bounds = this.sprite.getBounds();
    let center = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetCenter(center);
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

  updateRotation(): void {
    // Rotate the tower towards it's current target or
    // rotate to default position if no target exist or if target not in range.
    if (this.targetEnemy != null && this.targetEnemy.alive) {
      let direction = this.global.subtractPoints(this.center, this.targetEnemy.center);
      let distance = Phaser.Geom.Point.GetMagnitude(direction);

      if (distance <= this.range) {
        console.log('Enemy in range');
        this.rotation =
          Math.atan2(
            this.targetEnemy.center.y - this.center.y,
            this.targetEnemy.center.x - this.center.x
          ) * (180 / Math.PI);
      }      
    } else {
        if (this.rotation > 0) {
          this.rotation = this.rotation - 0.01;
        } else {
          this.rotation = 0;
        }
    }

    this.sprite.angle = this.rotation;
  }
}
