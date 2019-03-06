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
}
