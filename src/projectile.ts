import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';

export class Projectile {  
  public sprite: Phaser.GameObjects.Sprite;  
  public center: Phaser.Geom.Point;
  public bounds: Phaser.GameObjects.Rectangle;
  public active: boolean; // This determines if the projectile can be reused.

  private global: Global;
  private gameScene: GameScene;
  private velocity: Phaser.Math.Vector2;

  public rotation: number;  
  public elapsedShootTime: number;  
  public moveSpeed: number;
  public direction: Phaser.Geom.Point;
  public position: Phaser.Math.Vector2;

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number, global: Global) {    
    this.sprite = sprite;
    this.global = global;
    this.init(tileX, tileY);
  }

  init(tileX: number, tileY: number): void {    
    // TODO: Position the projectile as per tileX and tileY
  }

  update(delta: number): void {
    if (this.active) {
      // TODO: Add delta
      this.velocity.x = this.direction.x * this.moveSpeed;
      this.velocity.x = this.direction.y * this.moveSpeed;

      this.sprite.x += this.velocity.x;
      this.sprite.y += this.velocity.y;
    }
  }  
}
