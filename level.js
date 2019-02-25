class Level {
    constructor(index) {
        this.index = index;        
        this.init();
    }
    
    init() {
        this.index = 0;
        this.enemyCount = 20;
        this.enemySpawned = 0;
        this.enemyMoveSpeed = 0.5;
        this.enemyHp = 10;
        this.enemySpawnRate = 10000;
    }
}