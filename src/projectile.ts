import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';

export class Projectile {  
  public sprite: Phaser.GameObjects.Sprite;  
  public targetEnemy: Enemy;
  public center: Phaser.Geom.Point;
  public bounds: Phaser.GameObjects.Rectangle;
  public shootRate: number;
  public active: boolean; // This determines if the projectile can be reused.

  private global: Global;
  private gameScene: GameScene;
  private rotation: number;  
  private elapsedShootTime: number;  

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
      // TODO: Move the projectile
    }
  }  
}
