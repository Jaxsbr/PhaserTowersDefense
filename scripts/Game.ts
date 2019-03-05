export class Game {
  constructor() {
    this.game = new Phaser.Game(config);
  }

  game: Phaser.Game;
}


window.onload = () => {

  var game = new Game();

};