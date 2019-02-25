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

    let offset = { x: (this.cols * 32) / 2, y: (this.rows * 32) / 2 };

    let mapStart = this.game.getScreenCenter(offset);

    this.placeTiles(mapStart);

    this.towers = [];

    this.enemies = [];
    for (let e = 0; e < this.enemyPoolSize; e++) {
      let sprite = this.add.sprite(0, 0, 'squidDown').setOrigin(0, 0);
      sprite.scaleX = 0.5;
      sprite.scaleY = 0.5;

      let waypoints = this.waypoints.slice();

      let enemy = new Enemy(sprite, waypoints);

      enemy.activate(false);

      enemy.reset(mapStart, 10, 1.5); // default hp(10) and movespeed(1.5)

      this.enemies.push(enemy);
    }

    this.enemySpawner = new EnemySpawner();
    // TODO:
    // Move spawnRate value into level map file
    this.enemySpawner.setSpawnRate(10000);

    this.hud = new HUD();
  }

  placeTiles(mapStart) {
    for (var row = 0; row < this.rows; row++) {
      this.tiles[row] = [];

      for (var col = 0; col < this.cols; col++) {
        this.tiles[row][col] = {
          tileMapIndex: this.map[row][col],
          tileBounds: new Phaser.Geom.Rectangle(
            mapStart.x + col * 32,
            mapStart.y + row * 32,
            32,
            32
          ),
          sprite: this.add
            .sprite(
              mapStart.x + col * 32,
              mapStart.y + row * 32,
              'tiles',
              this.map[row][col]
            )
            .setOrigin(0, 0),
        };
      }
    }
  }

  update() {
    this.towers.forEach((tower) => tower.update());    
    this.enemySpawner.update(this.game.loop.delta);
    this.enemies.forEach((enemy) => enemy.update());    
    this.updateTowerTargets();
  }

  updateTowerTargets() {
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

        let direction = this.game.subtractPoints(tower.center, enemy.center);
        let distance = Phaser.Geom.Point.GetMagnitude(direction);

        if (closestEnemy == null) {
          // If no target exists, take first viable enemy.
          closestEnemy = enemy;
          closestDistance = distance;
          continue;
        }        
        //console.log('enemy distance: ' + distance);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestEnemy = enemy;
        }
      }

      tower.targetEnemy = closestEnemy;
    }
  }

  spawnEnemy() {
    let gameScene = game.scene.scenes[1];
    let enemy;
    let offset = {
      x: (gameScene.cols * 32) / 2,
      y: (gameScene.rows * 32) / 2,
    };
    let center = gameScene.game.getScreenCenter(offset);

    // TODO:
    // Enemies require stats assigned to them per level.
    // Below is temporary and should be retrieved from map/level/enemy/configuration.
    let hp = 10;
    let moveSpeed = 0.5;

    for (let e = 0; e < gameScene.enemies.length; e++) {
      enemy = gameScene.enemies[e];
      if (!enemy.sprite.active) {
        enemy.reset(center, hp, moveSpeed);
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
}
