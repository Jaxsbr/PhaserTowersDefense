class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });

    this.init();
  }

  init() {
    window.addEventListener('spawnEnemy', this.spawnEnemy);

    this.rows = 10;
    this.cols = 10;
    this.enemyPoolSize = 150;
    this.tiles = [];
    this.initMap();
  }

  initMap() {
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

  create() {    
    this.add.image(400, 300, 'background');

    this.createSquidAnimations();

    this.createTowerAnimations();    

    this.placeTiles();

    this.tower = new Tower(this, 5, 2);

    let offset = { x: (this.cols * 32) / 2, y: (this.rows * 32) / 2 };

    let center = this.game.getScreenCenter(offset);

    this.enemies = [];
    for (let e = 0; e < this.enemyPoolSize; e++) {
      let sprite = this.add.sprite(0, 0, 'squidDown').setOrigin(0, 0);
      sprite.scaleX = 0.5;
      sprite.scaleY = 0.5;

      let waypoints = this.waypoints.slice();

      let enemy = new Enemy(sprite, waypoints);
      
      enemy.activate(false);

      enemy.reset(center);

      this.enemies.push(enemy);
    }

    this.enemySpawner = new EnemySpawner(this, this.addEnemy);
  }

  placeTiles() {
    let offset = { x: (this.cols * 32) / 2, y: (this.rows * 32) / 2 };
    let center = this.game.getScreenCenter(offset);

    for (var row = 0; row < this.rows; row++) {
      this.tiles[row] = [];

      for (var col = 0; col < this.cols; col++) {
        this.tiles[row][col] = {
          tileMapIndex: this.map[row][col],
          tileBounds: new Phaser.Geom.Rectangle(
            center.x + col * 32,
            center.y + row * 32,
            32,
            32
          ),
          sprite: this.add
            .sprite(
              center.x + col * 32,
              center.y + row * 32,
              'tiles',
              this.map[row][col]
            )
            .setOrigin(0, 0),
        };
      }
    }
  }

  update() {
    this.tower.update();
    this.enemySpawner.update(this.game.loop.delta);
    this.enemies.forEach((enemy) => enemy.update());
  }

  spawnEnemy() {
    // TODO:
    // This is called from enemy class, the idea is to pass a "delegate"
    // from this gameScene class to enemy and then have enemy call the delegate method.
    // When addEnemy is called in this way, we lose context of the parent"this".
    // Thus passing of gameScene.
    // This is feels hacky, we should find a better solution.

    let enemy;
    let offset = { x: (this.cols * 32) / 2, y: (this.rows * 32) / 2 };
    let center = this.game.getScreenCenter(offset);

    for (let e = 0; e < this.enemies.length; e++) {
      enemy = this.enemies[e];
      if (!enemy.sprite.active) {
        enemy.reset(center);
        enemy.activate(true);
        break;
      }
    }
  }

  createSquidAnimations() {
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

  createTowerAnimations() {
    this.anims.create({
      key: 'towerIdle',
      frames: this.anims.generateFrameNumbers('tower', {
        start: 0,
        end: 0,
        first: 0,
      }),
      repeat: 1,
      frameRate: 5,
    });
  }
}
