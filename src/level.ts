export class Level {
  private index: number = 0;
  private enemyCount: number = 20;
  private enemySpawned: number = 0;
  public enemyMoveSpeed: number = 0.5;
  public enemyHp: number = 10;
  public enemySpawnRate: number = 2000;

  constructor(index: number) {
    this.index = index;
  }
}
