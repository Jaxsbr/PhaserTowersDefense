export class Level {
  private index: number = 0;
  private enemyCount: number = 20;
  private enemySpawned: number = 0;
  public enemyMoveSpeed: number = 0.5;
  public enemyHp: number = 10;
  private enemySpawnRate: number = 10000;

  constructor(index: number) {
    this.index = index;
  }
}
