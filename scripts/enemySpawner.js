class EnemySpawner {
  constructor() {
    this.spawnEnemies = true;
    this.spawnRateElapsed = 0;

    this.event = new CustomEvent('spawnEnemy');
  }

  update(elapsedMS) {
    this.spawnRateElapsed += elapsedMS;
    if (this.spawnRateElapsed >= this.spawnRate) {
      this.spawnRateElapsed = 0;

      window.dispatchEvent(this.event);
    }
  }

  setSpawnRate(spawnRate) {
    this.spawnRate = spawnRate;

    // By setting elapsed to spawnRate we will instantly spawn and enemy.
    // Set elapsed to 0 to wait a full spawnRate before spawning.
    this.spawnRateElapsed = this.spawnRate;
  }
}
