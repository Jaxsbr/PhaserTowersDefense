import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Enemy } from './enemy';
import { ProjectileConfig } from './objects/projectileConfig';
import { Projectile } from './projectile';

export class ProjectileEngine {
  private global: Global;
  private gameScene: GameScene;
  public targetEnemy: Enemy;
  private range: number;
  public center: Phaser.Geom.Point;
  private rotation: number;
  private shootRate: number;
  private elapsedShootTime: number;
  private projectilePool: Projectile[] = [];  

  private createProjectileRequestEvent: CustomEvent;
  

  constructor(global: Global) {    
    this.global = global;
    this.gameScene = this.global.game.scene.scenes[1];
    this.init();
  }

  init(): void {    
    window.addEventListener('createProjectileRequest', this.createProjectileRequest);
    this.initProjectilePool();
  }

  initProjectilePool() {        
    //const sprite = this.getDefaultProjectileSprite();
    const poolSize = 10;
    const tileX = 0;
    const tileY = 0;

    for (var i = 0; i < poolSize; i++) {
      let position = this.gameScene.tiles[tileY][tileX].tileBounds;
      const y = position.y + 16;
      const x = position.x + 16;

      const sprite = this.gameScene.add
        .sprite(0, 0, 'projectile')
        .setOrigin(0, 0)
        .setInteractive();
        sprite.scaleX = 0.2;
        sprite.scaleY = 0.2;
      this.projectilePool.push(
        new Projectile (sprite, x,  y, this.global)
      );
    }
  }

  getDefaultProjectileSprite(): Phaser.GameObjects.Sprite {
    const x = 0;
    const y = 0;
    const texture = 'projectile';
    const frame = 0;
    let sprite = new Phaser.GameObjects.Sprite(this.gameScene, x, y, texture, frame);
    sprite.visible = false;
    return sprite;
  }

  update(delta: number): void {
    for (var i = 0; i < this.projectilePool.length; i++) {
      this.projectilePool[i].update(delta);
    }
  }

  createProjectileRequest = (event: any) => {
    var projectTileConfig = event.detail as ProjectileConfig;
    if (projectTileConfig) {      
        // TODO:
        // Select a projectile from an object pool and reset it as per projectTileConfig
        let projectile = null;
        for (var i = 0; i < this.projectilePool.length; i++) {          
          projectile = this.projectilePool[i] as Projectile;
          if (!projectile.active) {
            //projectile.sprite = projectTileConfig.sprite;
            projectile.ttl = projectile.maxTtl;
            projectile.active = true;
            projectile.sprite.active = true;
            projectile.sprite.visible = true;
            projectile.bounds = projectTileConfig.bounds;
            projectile.position = projectTileConfig.position;
            projectile.rotation = projectTileConfig.rotation;
            projectile.moveSpeed = projectTileConfig.moveSpeed;
            projectile.direction = projectTileConfig.direction;
            break;
          }
        }        
    }
  }
}
