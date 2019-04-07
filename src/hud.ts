import { Global } from './global';
import { GameScene } from './scenes/gameScene';
import { Tower } from './tower';

export class HUD {
    private global: Global;  
    private gameScene: GameScene;
    public plainTower: Phaser.GameObjects.Sprite;
    public slowTower: Phaser.GameObjects.Sprite;
    public selectedTower: Phaser.GameObjects.Sprite;

    constructor(global: Global) {
        this.global = global;
        this.gameScene = this.global.game.scene.scenes[1];
  
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
        this.plainTower.setTint(0xff0000);
      }.bind(this));
  
      this.plainTower.on('pointerout', function(pointer) {
        this.plainTower.clearTint();
      }.bind(this));
  
      this.plainTower.on('pointerup', function(pointer) {
        this.plainTower.clearTint();
        this.selectedTower = this.gameScene.add
          .sprite(0, 0, this.plainTower.texture)
          .setOrigin(0, 0)
          .setInteractive();
          this.gameScene.hud.selectedTower.anims.play('towerPlainIdle');
      }.bind(this));
  
      this.gameScene.input.on('pointermove', function(pointer) {
        if (this.selectedTower) {
  
          this.selectedTower.x = pointer.worldX - this.selectedTower.width / 2;
          this.selectedTower.y = pointer.worldY - this.selectedTower.height / 2;
  
          let tileIndex = this.global.getTileIndexFromPointer(pointer);
  
          if (this.global.isValidMapTile(tileIndex) && this.global.isTileEmpty(tileIndex)) {                
              this.selectedTower.setTint(0x1caf2c);                    
          }
          else {
            this.selectedTower.setTint(0xff0000);
          }
        }
      }.bind(this));
  
      this.gameScene.input.on('pointerdown', function(pointer) {
        if (this.gameScene.hud.selectedTower) {
  
          let tileIndex = this.global.getTileIndexFromPointer(pointer);
  
          if (this.global.isValidMapTile(tileIndex) && this.global.isTileEmpty(tileIndex)) {          
  
            let sprite = this.gameScene.add
                .sprite(0, 0, this.selectedTower.texture)
                .setOrigin(0.5, 0.5);
            let tower = new Tower(sprite, tileIndex.x, tileIndex.y, this.global);        
  
            // Instead of pushing object directly into array,
            // send request to the responsible tower factory to do the work.
            this.gameScene.towers.push(tower);
          }
          
          this.selectedTower.destroy();
        }
      }.bind(this));
  
  
    }
  }
  