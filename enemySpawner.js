class EnemySpawner {
  constructor(gameScene, spawnFunction) {
    this.gameScene = gameScene;
    this.spawnEnemies = true;
    this.spawnRate = 350;
    this.spawnRateElapsed = 0;
    this.spawnFunction = spawnFunction;
  }

  update(elapsedMS) {
    this.spawnRateElapsed += elapsedMS;
    if (this.spawnRateElapsed >= this.spawnRate) {
      this.spawnRateElapsed = 0;
      this.spawnFunction(this.gameScene);
    }
  }
}
