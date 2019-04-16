export class ProjectileConfig {
    public moveSpeed: number;
    public position: Phaser.Math.Vector2;
    public direction: Phaser.Geom.Point;
    public bounds: Phaser.GameObjects.Rectangle;
    public sprite: Phaser.GameObjects.Sprite;
    public rotation: number;
    public shootRate: number;
}