export class Level {
  private index: number = 0;
  public enemyPoolSize: number = 5;
  private enemySpawned: number = 0;

  public plainTowerMoveSpeed: number = 0.08;
  public plainTowerShootRate: number = 0.5;
  public plainTowerShootRange: number = 128;
  public enemyMoveSpeed: number = 0.5;
  public enemyHp: number = 10;
  public enemySpawnRate: number = 2000;
  public map: any = [];
  public waypoints: any = [];

  constructor(index: number) {
    this.index = index;
    this.initMap();
  }

  initMap(): void {
    this.map = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    ];

    this.waypoints = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 5 },
      { x: 6, y: 4 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 9, y: 4 },
      { x: 9, y: 5 },
      { x: 9, y: 6 },
      { x: 9, y: 7 },
      { x: 8, y: 7 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ];
  }
}
