class Tower {
  constructor(tileX, tileY) {
    this.gameScene = game.scene.scenes[1];
    this.tileX = tileX;
    this.tileY = tileY;

    this.sprite = this.gameScene.add.sprite(0, 0, 'towerIdle').setOrigin(0.5, 0.5);
    this.sprite.scaleX = 1;
    this.sprite.scaleY = 1;
    this.sprite.anims.play('towerIdle');
    let position = this.gameScene.tiles[this.tileY][this.tileX].tileBounds;
    this.sprite.y = position.y;
    this.sprite.x = position.x;

    this.targetEnemy;    
    this.range = 64;
  }

  update() {
    this.updateCenter();    
    this.updateRotation();
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

  updateRotation() {
    // Rotate the tower towards it's current target or 
    // rotate to default position if no target exist or if target not in range.
    if (this.targetEnemy != null) {
      if (this.targetEnemy.alive) {

        let direction = this.gameScene.game.subtractPoints(this.center, this.targetEnemy.center);
        let distance = Phaser.Geom.Point.GetMagnitude(direction);          

          if (distance <= this.range) {
              this.rotation = (Math.atan2(
                this.targetEnemy.center.y - this.center.y, 
                this.targetEnemy.center.x - this.center.x
                ) * (180 / Math.PI));
          }
          else {
              this.targetEnemy = null;

              if (this.rotation > 0) {
                  this.rotation = this.rotation - 0.01;
              }
              else {
                  this.rotation = 0;
              }
          }
      }
    }
    else {
      this.targetEnemy = null;

      if (this.rotation > 0) {
          this.rotation = this.rotation - 0.01;
      }
      else {
          this.rotation = 0;
      }
    }

    this.sprite.angle = this.rotation;
  }
}
