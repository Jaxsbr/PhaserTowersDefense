import { Level } from '../level';
import { Global } from '../global';
import { Tower } from '../tower';
import { Enemy } from '../enemy';
import { EnemySpawner } from '../enemySpawner';

export class GameScene extends Phaser.Scene {
  private global: Global;
  private rows = 10;
  private cols = 10;
  private enemyPoolSize = 150;
  public tiles: any[] = [];
  private levelIndex = 1;
  private map = [];
  private waypoints = [];
  private level: Level;
  private towers: Tower[];
  private enemies: Enemy[];
  private enemySpawner: EnemySpawner;

  constructor(global: Global) {
    super({
      key: 'gameScene',
    });

    this.global = global;
  }

  preload(): void {
    this.initMap();
    window.addEventListener('spawnEnemy', this.spawnEnemy);
  }

  create(): void {
    this.level = new Level(this.levelIndex);
    this.add.image(400, 300, 'background');
    this.createSquidAnimation();
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

  spawnEnemy(): void {}

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

  setupEnemyPool(mapStart: any): void {
    for (let e = 0; e < this.enemyPoolSize; e++) {
      let sprite = this.add.sprite(0, 0, 'squidDown').setOrigin(0, 0);
      sprite.scaleX = 0.5;
      sprite.scaleY = 0.5;

      let waypoints = this.waypoints.slice();
      let enemy = new Enemy(sprite, waypoints);

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
    //this.hud = new HUD();
  }
}
