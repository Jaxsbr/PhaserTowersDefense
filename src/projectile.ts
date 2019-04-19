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
  public ttl: number;
  public maxTtl: number = 50;

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number, global: Global) {        
    this.sprite = sprite;
    this.global = global;
    this.gameScene = this.global.game.scene.scenes[1];
    this.velocity = new Phaser.Math.Vector2(0, 0);
    this.init(tileX, tileY);
  }

  init(x: number, y: number): void {    
    this.active = false;
    this.sprite.y = y + 16;
    this.sprite.x = x + 16;
    this.sprite.active = false;
    this.sprite.visible = false;
    this.sprite.anims.play('projectileIdle');
  }

  update(delta: number): void {
    if (this.active) {
      this.ttl -= 0.1;
      if (this.ttl <= 0) {
        this.active = false;
        this.sprite.active = false;
        this.sprite.visible = false;
        return;
      }

      // TODO: Add delta
      this.velocity.x = this.direction.x * this.moveSpeed;
      this.velocity.y = this.direction.y * this.moveSpeed;

      this.sprite.x += this.velocity.x;
      this.sprite.y += this.velocity.y;
    }
  }  
}
