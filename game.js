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
