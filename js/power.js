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
    this.particles = this.scene.add.particles("flares");

    this.scene.physics.add.collider(
      this.scene.bowser.bowser,
      this,
      this.destruir
    );
    this.body.reset(z == -1 ? x - 25 : x + 25, y);
    z == -1 ? this.setFlipX(false) : this.setFlipX(true);
    this.body.width = 30;
    this.body.height = 30;
    this.anims.play("ball", true);
    this.body.setGravityY(-1000);
    this.setActive(true);
    this.setVisible(true);
    z == -1 ? this.setVelocityX(-500) : this.setVelocityX(500);
    this.scene.ball = this;
  }
  destruir = () => {
    this.scene.bowser.handleLife(false, true);
    this.destroy(true);
    this.particles.destroy(true);
    console.log("jose jose");
  };
  update() {
    if (this.body != undefined) {
      this.emmitter = this.particles.createEmitter({
        frame: ["white", "green"],
        alpha: { start: 1, end: 0 },
        lifespan: { min: 100, max: 200 },
        angle: { min: 135, max: 225 },
        speed: { min: 300, max: 500 },
        scale: { start: 0.2, end: 0 },
        gravityY: 0,

        // frequency: 110,
        // maxParticles: 10,
        bounce: 0.9,
        //bounds: { x: 250, y: 0, w: 350, h: 0 },
        collideTop: false,
        collideBottom: false,
        blendMode: "ADD",
      });
      this.emmitter.startFollow(this);
    } else {
      this.particles.destroy(true);
    }
  }
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
    this.scene.paiton.handlePower();
    this.timer = setInterval(() => {
      if (this.scene.energy > 0) {
        this.fill();
        this.scene.paiton.handlePower();
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
