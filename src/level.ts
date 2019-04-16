export class Level {
  private index: number = 0;
  private enemyCount: number = 20;
  private enemySpawned: number = 0;

  public plainTowerShootRate: number = 1.5;
  public enemyMoveSpeed: number = 0.5;
  public enemyHp: number = 10;
  public enemySpawnRate: number = 2;

  constructor(index: number) {
    this.index = index;
  }
}
