export class EnemySpawner {    

  // TODO: Enemy spawner must also manage the lifecycle of an enemy.
  // Move enemy list from gameScene to here. 
  // Can Phaser ground be used?

    constructor(spawnStartTime = 0) {
        this.spawnEnemies = true;
        this.spawnRateElapsed = 0;    
        this.spawnEnemyEvent = new CustomEvent('spawnEnemy');
        this.spawnStartTime = spawnStartTime;
    }

    private spawnEnemies: boolean;
    private spawnRateElapsed: number;
    private spawnEnemyEvent: CustomEvent;
    private spawnRate: number;
    private spawnStartTime: number;

    public update(elapsedMS: number) {
        this.spawnRateElapsed += elapsedMS;
        if (this.spawnRateElapsed >= this.spawnRate) {
          this.spawnRateElapsed = 0;    
          window.dispatchEvent(this.spawnEnemyEvent);
        }
      }
    
    public setSpawnRate(spawnRate: number) {
        this.spawnRate = spawnRate;            
        this.spawnRateElapsed = this.spawnStartTime;
      }
}