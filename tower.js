class Tower {
  constructor(gameScene, tileX, tileY) {
    this.gameScene = gameScene;
    this.tileX = tileX;
    this.tileY = tileY;
  }

  update() {
    this.sprite = this.gameScene.add.sprite(0, 0, 'towerIdle').setOrigin(0, 0);
    this.sprite.scaleX = 1;
    this.sprite.scaleY = 1;
    this.sprite.anims.play('towerIdle');

    let position = this.gameScene.tiles[this.tileY][this.tileX].tileBounds;
    this.sprite.y = position.y;
    this.sprite.x = position.x;


    
  }
}
