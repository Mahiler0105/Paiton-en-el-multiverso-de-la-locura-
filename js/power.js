class Fireflame extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fire");
  }
  fire(x, y, z) {
    this.body.reset(z == 0 ? x - 25 : x + 25, y);
    z == 0 ? this.setFlipX(false) : this.setFlipX(true);
    this.anims.play("fuego", true);
    this.body.setGravityY(-1000);
    this.setActive(true);
    this.setVisible(true);
  }
}
class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fire");
    this.scene = scene;
  }

  fire(x, y, z) {
    this.scene.physics.add.collider(
      this.scene.bowser.bowser,
      this,
      this.destruir
    );
    this.body.reset(z == 0 ? x - 25 : x + 25, y);
    z == 0 ? this.setFlipX(false) : this.setFlipX(true);
    this.body.width = 20;
    this.body.height = 20;
    this.anims.play("ball", true);
    //this.body.bounce = 0.8;
    this.body.setGravityY(-1000);
    this.setActive(true);
    this.setVisible(true);
    z == 0 ? this.setVelocityX(-500) : this.setVelocityX(500);
  }
  destruir = () => {
    this.scene.bowser.handleLife(false, true);
    this.destroy(true);
    console.log("jose jose");
  };
}

export default class Powered extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.timer = null;
  }
  fill() {
    this.createMultiple({
      classType: Fireball,
      frameQuantity: 1,
      active: false,
      visible: false,
      key: "fire",
    });
  }
  init() {
    this.fill();
    this.scene.handlePower();
    this.timer = setInterval(() => {
      if (this.scene.energy > 0) {
        this.fill();
        this.scene.handlePower();
      }
    }, 400);
  }
  stop() {
    clearInterval(this.timer);
  }
  fireLaser(x, y, z) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y, z);
    }
  }
}
