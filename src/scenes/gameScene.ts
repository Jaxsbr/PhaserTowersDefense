import { Level } from '../level';
import { Tower } from '../tower';
import { Enemy } from '../enemy';
import { EnemySpawner } from '../enemySpawner';
import { Global } from '../global';
import { HUD } from '../hud';
import { movementAnimation } from '../objects/movementAnimation';

export class GameScene extends Phaser.Scene {  
  private rows: number = 10;
  private cols: number = 10;
  private enemyPoolSize = 150;
  public tiles: any[] = [];
  private levelIndex = 1;
  private map = [];
  private waypoints = [];
  private level: Level;
  private towers: Tower[] = [];
  private projectiles: any[] = []; // TODO: Create projectile class
  private enemies: Enemy[] = [];
  private enemySpawner: EnemySpawner;
  private animation: movementAnimation;
  private hud: HUD;
  public global: Global;
  private delta: number;
  private deltaTime: number = Date.now();


  constructor() {
    super({
      key: 'gameScene',
    });
  }

  preload(): void {
    this.initMap();
    window.addEventListener('spawnEnemy', this.spawnEnemy);
    window.addEventListener('createProjectileRequest', this.spawnEnemy);
  }

  create(): void {
    this.global = new Global(this.game);
    this.level = new Level(this.levelIndex);
    this.global.level = this.level;
    this.add.image(400, 300, 'game_background');
    this.createSquidAnimation();
    this.createOrkAnimation();
    this.createTowerAnimations();

    let offset = {
      x: (this.cols * this.global.tileWidth) / 2,
      y: (this.rows * this.global.tileHeight) / 2,
    };

    let mapStart = this.global.getScreenCenter(offset);
    this.placeTiles(mapStart);
    this.setupEnemyPool(mapStart);
    this.setupEnemySpawner();
    this.setupHUD();
  }

  // TODO:
  // Extract into MapLoader
  initMap(): void {
    this.map = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    ];

    this.waypoints = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 5 },
      { x: 6, y: 4 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 9, y: 4 },
      { x: 9, y: 5 },
      { x: 9, y: 6 },
      { x: 9, y: 7 },
      { x: 8, y: 7 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ];
  }

  createSquidAnimation(): void {
    this.anims.create({
      key: 'squidDown',
      frames: this.anims.generateFrameNumbers('squid', {
        start: 0,
        end: 2,
        first: 0,
      }),
      repeat: -1,
      frameRate: 5,
    });

    this.anims.create({
      key: 'squidLeft',
      frames: this.anims.generateFrameNumbers('squid', {
        start: 3,
        end: 5,
        first: 3,
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: 'squidRight',
      frames: this.anims.generateFrameNumbers('squid', {
        start: 6,
        end: 8,
        first: 6,
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: 'squidUp',
      frames: this.anims.generateFrameNumbers('squid', {
        start: 9,
        end: 11,
        first: 9,
      }),
      repeat: -1,
      frameRate: 5,
    });
  }

  createOrkAnimation(): void {
    this.anims.create({
      key: 'orkDown',
      frames: this.anims.generateFrameNumbers('ork', {
        start: 0,
        end: 2,
        first: 0,
      }),
      repeat: -1,
      frameRate: 5,
    });

    this.anims.create({
      key: 'orkLeft',
      frames: this.anims.generateFrameNumbers('ork', {
        start: 3,
        end: 5,
        first: 3,
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: 'orkRight',
      frames: this.anims.generateFrameNumbers('ork', {
        start: 6,
        end: 8,
        first: 6,
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: 'orkUp',
      frames: this.anims.generateFrameNumbers('ork', {
        start: 9,
        end: 11,
        first: 9,
      }),
      repeat: -1,
      frameRate: 5,
    });
  }

  createTowerAnimations(): void {
    this.anims.create({
      key: 'towerPlainIdle',
      frames: this.anims.generateFrameNumbers('tower_plain', {
        start: 0,
        end: 0,
        first: 0,
      }),
      repeat: 1,
      frameRate: 5,
    });

    this.anims.create({
      key: 'towerSlowIdle',
      frames: this.anims.generateFrameNumbers('tower_slow', {
        start: 0,
        end: 0,
        first: 0,
      }),
      repeat: 1,
      frameRate: 5,
    });
  }

  placeTiles(mapStart: any): void {
    for (var row = 0; row < this.rows; row++) {
      this.tiles[row] = [];

      for (var col = 0; col < this.cols; col++) {
        this.tiles[row][col] = {
          tileMapIndex: this.map[row][col],
          tileBounds: new Phaser.Geom.Rectangle(
            mapStart.x + col * this.global.tileWidth,
            mapStart.y + row * this.global.tileHeight,
            this.global.tileWidth,
            this.global.tileHeight
          ),
          sprite: this.add
            .sprite(
              mapStart.x + col * this.global.tileWidth,
              mapStart.y + row * this.global.tileHeight,
              'tiles',
              this.map[row][col]
            )
            .setOrigin(0, 0),
        };
      }
    }
  }

  update(): void {     
    this.towers.forEach((tower) => tower.update(this.delta));
    this.updateDelta();
    this.enemySpawner.update(this.delta);
    this.enemies.forEach((enemy) => enemy.update());
    this.updateTowerTargets();
  }

  updateDelta() {
    var now = Date.now();                   
    this.delta = (now - this.deltaTime) / 1000;
    this.deltaTime = now;
  }

  updateTowerTargets(): void {
    for (let t = 0; t < this.towers.length; t++) {
      let closestEnemy = null;
      let closestDistance = 99999;
      let tower = this.towers[t];

      for (let e = 0; e < this.enemies.length; e++) {
        let enemy = this.enemies[e];
        if (!enemy.sprite.active || !enemy.alive) {
          continue;
        }

        // TODO:
        // Use relative closeness by determining if
        // enemy within x amount of tiles from tower, only then check distance.

        let direction = this.global.subtractPoints(tower.center, enemy.center);
        let distance = Phaser.Geom.Point.GetMagnitude(direction);

        if (closestEnemy == null) {
          // If no target exists, take first viable enemy.
          closestEnemy = enemy;
          closestDistance = distance;
          continue;
        }

        if (distance < closestDistance) {
          closestDistance = distance;
          closestEnemy = enemy;
        }
      }

      tower.targetEnemy = closestEnemy;
    }
  }

  spawnEnemy = () => {
    let gameScene = this.game.scene.scenes[1];
    let enemy;
    let offset = {
      x: (gameScene.cols * this.global.tileWidth) / 2,
      y: (gameScene.rows * this.global.tileHeight) / 2,
    };
    let center = this.global.getScreenCenter(offset);
    let hp = gameScene.level.enemyHp;
    let moveSpeed = gameScene.level.enemyMoveSpeed;

    for (let e = 0; e < gameScene.enemies.length; e++) {
      enemy = gameScene.enemies[e];
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

  setupEnemyPool(mapStart: any): void {
    for (let e = 0; e < this.enemyPoolSize; e++) {
      let animation = this.getRandomEnemyMovementAnimation(2);
      let sprite = this.add.sprite(0, 0, animation.down).setOrigin(0, 0);
      sprite.scaleX = 0.5;
      sprite.scaleY = 0.5;

      let waypoints = this.waypoints.slice();
      let enemy = new Enemy(sprite, waypoints, this.global, animation);

      enemy.activate(false);
      enemy.reset(mapStart, this.level.enemyHp, this.level.enemyMoveSpeed);
      this.enemies.push(enemy);
    }
  }

  setupEnemySpawner(): void {
    this.enemySpawner = new EnemySpawner();
    this.enemySpawner.setSpawnRate(this.level.enemySpawnRate);
  }

  setupHUD(): void {
    this.hud = new HUD(this.global);
  }
}
