import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';

export class Projectile {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private gameScene: GameScene;
  public targetEnemy: Enemy;
  private range: number;
  public center: Phaser.Geom.Point;
  private rotation: number;
  private shootRate: number;
  private elapsedShootTime: number;

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number, global: Global) {    
    this.sprite = sprite;
    this.global = global;
    this.init(tileX, tileY);
  }

  init(tileX: number, tileY: number): void {    
    
  }

  update(delta: number): void {

  }  
}
