export class Level {
  private index: number = 0;
  public enemyPoolSize: number = 5;
  private enemySpawned: number = 0;

  public plainTowerMoveSpeed: number = 0.01;
  public plainTowerShootRate: number = 2;
  public plainTowerShootRange: number = 10;
  public enemyMoveSpeed: number = 0.5;
  public enemyHp: number = 10;
  public enemySpawnRate: number = 2000;

  constructor(index: number) {
    this.index = index;
  }
}
