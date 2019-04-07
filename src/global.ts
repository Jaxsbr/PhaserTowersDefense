export class Global {
  public tileWidth: number = 32;
  public tileHeight: number = 32;
  public game: Phaser.Game;

  constructor(game: Phaser.Game) {
    this.game = game;
  }

  getScreenCenter(offset: any): any {    
    return {
      x: +this.game.config.width / 2 - offset.x,
      y: +this.game.config.height / 2 - offset.y,
    };
  }

  subtractPoints = function(fromPoint: Phaser.Geom.Point, toPoint: Phaser.Geom.Point) {
    let temp = Phaser.Geom.Point.Clone(toPoint);
    temp.x -= fromPoint.x;
    temp.y -= fromPoint.y;
  
    return temp;
  };

  getTileIndexFromPointer = function(pointer: any) {
    let gameScene = this.game.scene.scenes[1];
  
    let offset = { 
      x: (gameScene.cols * this.tileWidth) / 2, 
      y: (gameScene.rows * this.tileHeight) / 2 };
    let mapStart = this.getScreenCenter(offset);    
  
    let mapPoint = { 
      x: pointer.worldX - mapStart.x, 
      y: pointer.worldY - mapStart.y };
    
    let tileX = Math.floor(mapPoint.x / this.tileWidth);
    let tileY = Math.floor(mapPoint.y / this.tileHeight);
  
    return { x: tileX, y: tileY };
  }
  
  isValidMapTile = function(tileIndex: any) {
    let gameScene = this.game.scene.scenes[1];
  
    for (let w = 0; w < gameScene.waypoints.length; w++) {
      if(gameScene.waypoints[w].x == tileIndex.x &&
         gameScene.waypoints[w].y == tileIndex.y) {
           return false;
         }
    }
  
    return !(tileIndex.x < 0 || 
             tileIndex.y < 0 || 
             tileIndex.x > gameScene.cols ||          
             tileIndex.y > gameScene.rows);
  }
  
  isTileEmpty = function(tileIndex: any) {
    let gameScene = this.game.scene.scenes[1];
    let towerCount = gameScene.towers.length;
    for (let t = 0; t < towerCount; t++) {
      if (gameScene.towers[t].tileX == tileIndex.x &&
          gameScene.towers[t].tileY == tileIndex.y) {
            return false;
      }
    }  
    return true;
  }
}
