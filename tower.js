class Tower {
  constructor(tileX, tileY) {
    this.gameScene = game.scene.scenes[1];
    this.tileX = tileX;
    this.tileY = tileY;

    this.sprite = this.gameScene.add.sprite(0, 0, 'towerIdle').setOrigin(0, 0);
    this.sprite.scaleX = 1;
    this.sprite.scaleY = 1;
    this.sprite.anims.play('towerIdle');
    let position = this.gameScene.tiles[this.tileY][this.tileX].tileBounds;
    this.sprite.y = position.y;
    this.sprite.x = position.x;

    this.targetEnemy;    
  }

  update() {
    this.updateCenter();    
  }

  updateCenter() {
    let bounds = this.sprite.getBounds();
    let center = Phaser.Geom.Rectangle.GetCenter(bounds);
    this.assignOrSetCenter(center);
  }

  assignOrSetCenter(point) {
    // This function will only re-assign a point if it's undefined.
    // If however the point is not undefined, we re-use by assigning x and y.
    // This is done to improve memory usage performance.
    if (!this.center) {
      this.center = point;
    } else {
      this.center.x = point.x;
      this.center.y = point.y;
    }
  }
}
