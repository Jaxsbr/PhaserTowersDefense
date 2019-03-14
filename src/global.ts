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
}
