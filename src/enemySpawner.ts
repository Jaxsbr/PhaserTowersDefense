import { Enemy } from './enemy';
import { Global } from './global';
import { movementAnimation } from './objects/movementAnimation';
import { GameScene } from './scenes/gameScene';

export class EnemySpawner {    

    constructor(global: Global, spawnStartTime = 0) {
        this.spawnRateElapsed = 0;    
        this.spawnStartTime = spawnStartTime;
        this.global = global;
        this.gameScene = this.global.game.scene.scenes[1];
        this.enemySprites = this.gameScene.add.group();
        this.setupEnemyPool();
    }

    private spawnRateElapsed: number;
    private spawnRate: number;
    private spawnStartTime: number;
    public enemies: Enemy[] = [];
    private gameScene: GameScene;
    public global: Global;
    public enemySprites: Phaser.GameObjects.Group;

    public update(elapsedMS: number) {
      this.enemies.forEach((enemy) => enemy.update());
      this.updateSpawnRate(elapsedMS);
    }

    private updateSpawnRate(elapsedMS: number) {
      this.spawnRateElapsed += elapsedMS;
      if (this.spawnRateElapsed >= this.spawnRate) {
        this.spawnRateElapsed = 0;    
        this.spawnEnemy();
      }
    }
    
    public setSpawnRate(spawnRate: number) {
        this.spawnRate = spawnRate;            
        this.spawnRateElapsed = this.spawnStartTime;
    }

    setupEnemyPool(): void {      
      let offset = {
        x: (this.gameScene.cols * this.global.tileWidth) / 2,
        y: (this.gameScene.rows * this.global.tileHeight) / 2,
      };
  
      let mapStart = this.global.getScreenCenter(offset);
      
      for (let e = 0; e < this.global.level.enemyPoolSize; e++) {
        let animation = this.getRandomEnemyMovementAnimation(2);

        let sprite = this.enemySprites.create(0, 0, animation.down).setOrigin(0, 0);
        sprite.scaleX = 0.5;
        sprite.scaleY = 0.5;
  
        let waypoints = this.global.level.waypoints.slice();
        let enemy = new Enemy(sprite, waypoints, this.global, animation);
  
        enemy.activate(false);
        enemy.reset(mapStart, this.global.level.enemyHp, this.global.level.enemyMoveSpeed);
        this.enemies.push(enemy);
      }
    }

    spawnEnemy(): void {
      let enemy;
      let enemyCount = this.enemies.length;
      let offset = {
        x: (this.gameScene.cols * this.global.tileWidth) / 2,
        y: (this.gameScene.rows * this.global.tileHeight) / 2,
      };
      let center = this.global.getScreenCenter(offset);
      let hp = this.global.level.enemyHp;
      let moveSpeed = this.global.level.enemyMoveSpeed;
  
      for (let e = 0; e < enemyCount; e++) {
        enemy = this.enemies[e];
        if (!enemy.sprite.active) {
          enemy.reset(center, hp, moveSpeed);
          enemy.activate(true);
          break;
        }
      }
    } 
    
    getRandomEnemyMovementAnimation(max: number): movementAnimation {
      const random = Math.floor(Math.random() * Math.floor(max));
      if (random === 0) {
        return new movementAnimation("orkLeft", "orkRight", "orkUp", "orkDown");      
      }
      else {      
        return new movementAnimation("squidLeft", "squidRight", "squidUp", "squidDown");
      }    
    }
}