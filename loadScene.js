class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'loadScene' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');

    this.load.spritesheet('tower', 'assets/tower.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('ork', 'assets/ork_spritesheet.png', {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet('squid', 'assets/squid_spritesheet.png', {
      frameWidth: 64,
      frameHeight: 80,
    });
    this.load.spritesheet('tiles', 'assets/tile_spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(0, 0, 'background');

    this.input.once(
      'pointerup',
      function() {
        this.scene.start('gameScene');
      },
      this,
    );
  }
}
