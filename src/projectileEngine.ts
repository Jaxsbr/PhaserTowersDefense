import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';
import { ProjectileConfig } from './objects/projectileConfig';

export class ProjectileEngine {
  private global: Global;
  public sprite: Phaser.GameObjects.Sprite;
  private gameScene: GameScene;
  public targetEnemy: Enemy;
  private range: number;
  public center: Phaser.Geom.Point;
  private rotation: number;
  private shootRate: number;
  private elapsedShootTime: number;

  private createProjectileRequestEvent: CustomEvent;
  

  constructor(sprite:Phaser.GameObjects.Sprite, tileX: number, tileY: number, global: Global) {    
    this.sprite = sprite;
    this.global = global;
    this.init(tileX, tileY);

    // TODO:
    // Projectile Engine
    // Listen for projectile create request event
  }

  preload(): void {    
    window.addEventListener('createProjectileRequest', this.createProjectileRequest);
  }

  init(tileX: number, tileY: number): void {    
    
  }

  update(delta: number): void {

  }

  createProjectileRequest = (event: any) => {
    var projectTileConfig = event.detail as ProjectileConfig;
    if (projectTileConfig) {
        // Select a projectile from an object pool and reset it as per projectTileConfig
        console.log('projectile creation request triggerd');
    }
  }
}
