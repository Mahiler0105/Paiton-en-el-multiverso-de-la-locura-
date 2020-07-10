class Pow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,"fire");
    }
    fire(x, y, z) {
        this.body.reset(x, y);
        z==0 ? this.setFlipX(false) : this.setFlipX(true);
        this.anims.play("fuego", true);
        this.body.setGravityY(-1000);
        this.setActive(true);
        this.setVisible(true);
        z == 0 ? this.setVelocityX(-500) : this.setVelocityX(500);
    }    
}

export default class Powered extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene
        this.timer = null;  
    }
    init(){
        this.createMultiple({
            classType: Pow,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: "fire",
        });
        this.scene.handlePower()
        this.timer = setInterval(() => {
            this.createMultiple({
                classType: Pow,
                frameQuantity: 1,
                active: false,
                visible: false,
                key: "fire",
            });    
            this.scene.handlePower()    
        }, 1500);  
    }
    stop(){
        clearInterval(this.timer);
    }
    fireLaser(x, y, z) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, z);
        }
    }
}
