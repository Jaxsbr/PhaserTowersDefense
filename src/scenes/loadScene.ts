export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'loadScene',
    });
  }

  preload(): void {
    this.load.image('menu_background', './assets/menu_background.png');
    this.load.image('game_background', './assets/game_background.png');

    this.load.spritesheet('tower_plain', './assets/tower_plain.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('tower_slow', './assets/tower_slow.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('ork', './assets/ork_spritesheet.png', {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet('squid', './assets/squid_spritesheet.png', {
      frameWidth: 64,
      frameHeight: 80,
    });
    this.load.spritesheet('tiles', './assets/tiles_spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(): void {
    this.add.image(400, 300, 'menu_background');

    this.input.once(
      'pointerup',
      function() {
        this.scene.start('gameScene');
      },
      this,
    );
  }
}