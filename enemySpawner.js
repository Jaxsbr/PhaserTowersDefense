class EnemySpawner {
  constructor() {
    this.spawnEnemies = true;
    this.spawnRate = 350;
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
}
