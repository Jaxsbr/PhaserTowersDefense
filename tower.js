class Tower {
  constructor(gameScene, tileX, tileY) {
    this.gameScene = gameScene;
    this.tileX = tileX;
    this.tileY = tileY;
  }

  update() {
    this.sprite = this.gameScene.add.sprite(0, 0, 'squidDown').setOrigin(0, 0);
    this.sprite.scaleX = 0.5;
    this.sprite.scaleY = 0.5;
    this.sprite.anims.play('squidDown');

    let center = this.gameScene.getScreenCenter();
    let position = this.gameScene.tiles[this.tileY][this.tileX].tileBounds;
    this.sprite.y = position.y;
    this.sprite.x = position.x;
  }
}
