var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [LoadScene, GameScene],
};

var game = new Phaser.Game(config);
game.tileWidth = 32;
game.tileHeight = 32;

game.getScreenCenter = function(offset) {
  return {
    x: game.config.width / 2 - offset.x,
    y: game.config.height / 2 - offset.y,
  };
};

game.subtractPoints = function(fromPoint, toPoint) {
  let temp = Phaser.Geom.Point.Clone(toPoint);
  temp.x -= fromPoint.x;
  temp.y -= fromPoint.y;

  return temp;
};

game.getTileIndexFromPointer = function(pointer) {
  let gameScene = this.scene.scenes[1];

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

game.isValidMapTile = function(tileIndex) {
  let gameScene = this.scene.scenes[1];

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

game.isTileEmpty = function(tileIndex) {
  let gameScene = this.scene.scenes[1];
  let towerCount = gameScene.towers.length;
  for (let t = 0; t < towerCount; t++) {
    if (gameScene.towers[t].tileX == tileIndex.x &&
        gameScene.towers[t].tileY == tileIndex.y) {
          return false;
    }
  }  
  return true;
}
