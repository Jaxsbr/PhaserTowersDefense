class HUD {
  constructor() {
    this.gameScene = game.scene.scenes[1];

    this.plainTower = this.gameScene.add
      .sprite(0, 0, 'towerPlainIdle')
      .setOrigin(0, 0)
      .setInteractive();

    this.slowTower = this.gameScene.add
      .sprite(this.plainTower.x + this.plainTower.width, 0, 'towerSlowIdle')
      .setOrigin(0, 0)
      .setInteractive();

    this.selectedTower;

    this.plainTower.scaleX = 1;
    this.plainTower.scaleY = 1;
    this.plainTower.anims.play('towerPlainIdle');

    this.slowTower.scaleX = 1;
    this.slowTower.scaleY = 1;
    this.slowTower.anims.play('towerSlowIdle');

    this.plainTower.on('pointerdown', function(pointer) {
      this.setTint(0xff0000);
    });

    this.plainTower.on('pointerout', function(pointer) {
      this.clearTint();
    });

    this.plainTower.on('pointerup', function(pointer) {
      let gameScene = game.scene.scenes[1];
      this.clearTint();
      gameScene.hud.selectedTower = gameScene.add
        .sprite(0, 0, gameScene.hud.plainTower.texture)
        .setOrigin(0, 0)
        .setInteractive();
      gameScene.hud.selectedTower.anims.play('towerPlainIdle');
      //gameScene.hud.selectedTower.bringToTop();
    });

    this.gameScene.input.on('pointermove', function(pointer) {
      let gameScene = game.scene.scenes[1];
      if (gameScene.hud.selectedTower) {

        gameScene.hud.selectedTower.x = pointer.worldX - gameScene.hud.selectedTower.width / 2;
        gameScene.hud.selectedTower.y = pointer.worldY - gameScene.hud.selectedTower.height / 2;

        let tileIndex = game.getTileIndexFromPointer(pointer);

        if (game.isValidMapTile(tileIndex) && game.isTileEmpty(tileIndex)) {                
            gameScene.hud.selectedTower.setTint(0x1caf2c);                    
        }
        else {
          gameScene.hud.selectedTower.setTint(0xff0000);
        }
      }
    });

    this.gameScene.input.on('pointerdown', function(pointer) {
      let gameScene = game.scene.scenes[1];
      if (gameScene.hud.selectedTower) {

        let tileIndex = game.getTileIndexFromPointer(pointer);

        if (game.isValidMapTile(tileIndex) && game.isTileEmpty(tileIndex)) {          

          let tower = new Tower(tileIndex.x, tileIndex.y, gameScene.hud.selectedTower.texture);        

          // Instead of pushing object directly into array,
          // send request to the responsible tower factory to do the work.
          gameScene.towers.push(tower);
        }
        
        gameScene.hud.selectedTower.destroy();
      }
    });


  }
}
