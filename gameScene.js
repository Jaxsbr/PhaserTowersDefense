class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });

    this.init();
  }

  init() {    
    this.rows = 10;
    this.cols = 10;
    this.enemyPoolSize = 150;

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

    this.tiles = [];

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
    this.createSquidAnimations();

    this.add.image(400, 300, 'background');

    this.placeTiles();

    this.enemies = [];
    for (let e = 0; e < this.enemyPoolSize; e++) {
      let enemy = new Enemy(this);
      enemy.alive = false;
      enemy.sprite.active = false;
      this.enemies.push(enemy);
    }

    this.enemySpawner = new EnemySpawner(this, this.addEnemy);
  }

  getScreenCenter() {
    return {
      x: this.game.config.width / 2 - (this.cols * 32) / 2,
      y: this.game.config.height / 2 - (this.rows * 32) / 2,
    };
  }

  placeTiles() {
    let center = this.getScreenCenter();
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
    this.enemySpawner.update(this.game.loop.delta);
    this.enemies.forEach((enemy) => enemy.update());
  }

  addEnemy(gameScene) {
    // TODO:
    // This is called from enemy class, the idea is to pass a "delegate"
    // from this gameScene class to enemy and then have enemy call the delegate method.
    // When addEnemy is called in this way, we lose context of the parent"this".
    // Thus passing of gameScene.
    // This is feels hacky, we should find a better solution.

    let enemy;
    for (let e = 0; e < gameScene.enemies.length; e++) {
      enemy = gameScene.enemies[e];
      if (!enemy.sprite.active) {
        enemy.reset();
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
}
