import Paiton from "./paiton.js";
export default class Bowser {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.bowser = new Phaser.Physics.Arcade.Sprite(this.scene);
    this.direccion = 0;
    this.choque = false;
    this.hurt = false;
    this.atacando = false;

    this.life = 4500;
    this.vida = null;
  }
  preload() {
    this.scene.load.path = "../../img/";
    this.scene.load.atlas("bowser", "bowser.png", "bowser.json");
  }
  create() {
    this.bowser = this.scene.physics.add.sprite(
      this.x,
      this.y,
      "bowser",
      "1.idle/0.png"
    );
    this.bowser.setSize(50, 53);
    this.bowser.setDisplaySize(150, 150);
    this.bowser.flipX = true;

    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "1.idle/",
        start: 0,
        end: 13,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "victoria1",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "2.victory_I/",
        start: 0,
        end: 32,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "punch",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "3.simplepunch/",
        start: 0,
        end: 23,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "debil",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "4.weaken/",
        start: 0,
        end: 15,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "victoria2",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "5.victory_II/",
        start: 0,
        end: 9,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "moverse",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "6.caminatas/",
        start: 0,
        end: 15,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "superpunch",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "7.punch/",
        start: 0,
        end: 27,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "fallo",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "8.punchfail/",
        start: 0,
        end: 14,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "muerto",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "9.dead/",
        start: 0,
        end: 12,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "lanzafuego",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "10.fire/",
        start: 0,
        end: 41,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "risa",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "11.laught/",
        start: 0,
        end: 28,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "megapunch",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "12.megapunch/",
        start: 0,
        end: 14,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "defensa",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "13.defenseshell/",
        start: 0,
        end: 4,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "golpeado",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "14.stunned/",
        start: 0,
        end: 2,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "victoria3",
      frames: this.scene.anims.generateFrameNames("bowser", {
        prefix: "15.victory_III/",
        start: 0,
        end: 6,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "herido",
      frames: [{ key: "bowser", frame: "hurt.png" }],
      frameRate: 10,
    });

    this.vida = this.scene.add.text(1040, 40, "", {
      fontSize: "20px",
      fill: "#ffffff",
    });
    this.vida.setScrollFactor(0);
    this.mostrado = false;
  }
  update() {
    var distance = this.bowser.body.x - this.scene.paiton.paiton.body.x;

    if (distance > 800 || distance < -800) {
      this.estatico();
      this.direccion = 0;
      this.mostrado = false;
      this.handleLife(true, false);
    } else {
      if (!this.mostrado) {
        this.handleLife(false, false);
        this.mostrado = true;
      }

      if (distance > 100 || distance < -160) {
        distance > 0 ? (this.direccion = -1) : (this.direccion = 1);

        if (!this.hurt) this.moverse(this.direccion);
        else {
          this.herido();
          setTimeout(() => {
            this.hurt = false;
          }, 1000);
          this.bowser.setVelocityX(0);
        }
      } else {
        if (!this.atacando) {
          this.direccion = 0;
          this.punch(2);
          this.bowser.setVelocityX(0);
          this.atacando = true;
        }

        //this.lanzafuego()
        //Math.round(Math.random() * 3)
      }
    }
    //console.log(distance)
  }
  handleLife = (away, danorecibido) => {
    if (danorecibido) {
      this.life -= Math.random() * 10;
      this.hurt = true;
      //this.herido()
    }
    this.vida.setText(away ? "" : `Vida: ${this.life}`);
  };
  estatico() {
    this.bowser.anims.play("idle", true);
    this.bowser.setVelocityX(0);
  }

  debil() {
    this.bowser.anims.play("debil", true);
  }
  moverse(direccion) {
    if (!this.bowser.body.onWall()) {
      if (!this.choque) {
        this.bowser.anims.play("moverse", true);
        if (direccion == -1) this.bowser.flipX = true;
        else if (direccion == 1) this.bowser.flipX = false;
        this.bowser.setVelocityX(direccion * 50);
      } else {
        this.estatico();
        if (this.direccion != this.anterior) this.choque = false;
      }
    } else {
      this.choque = true;
      this.anterior = this.direccion;

      this.direccion = 0;
      this.lanzafuego();
      //this.punch(Math.round(Math.random() * 3))
      this.bowser.setVelocityX(0);
    }
  }
  lanzafuego() {
    this.bowser.anims.play("lanzafuego", true);
  }
  risa() {
    this.bowser.anims.play("risa", true);
  }
  herido() {
    this.bowser.anims.play("herido", true);
  }
  golpeado() {
    this.bowser.anims.play("golpeado", true);
  }
  defensa() {
    this.bowser.anims.play("defensa", true);
  }
  punch(animacion) {
    if (animacion == 0) this.bowser.anims.play("punch", true);
    else if (animacion == 1) this.bowser.anims.play("superpunch", true);
    else if (animacion == 2) this.bowser.anims.play("megapunch", true);

    // this.scene.paiton.paiton.body.setVelocityX(-400)
    // this.scene.paiton.paiton.body.setVelocityY(150)
    // this.scene.paiton.paiton.setBounce(2)

    //this.scene.paiton.paiton.setVelocityX(-10).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(200);
    this.scene.paiton.paiton
      .setVelocityX(-10)
      .setBounce(1, 1)
      .setCollideWorldBounds(false);

    this.scene.paiton.handleVida();
    setTimeout(() => {
      this.atacando = false;
    }, 1500);
  }
  fallopunch() {
    this.bowser.anims.play("fallo", true);
  }
  victoria(animacion) {
    if (animacion == 0) this.bowser.anims.play("victoria1", true);
    else if (animacion == 1) this.bowser.anims.play("victoria2", true);
    else if (animacion == 2) this.bowser.anims.play("victoria3", true);

    this.vida.setText(away ? "" : `Vida: ${this.life}`);
    this.herido();
    // this.bowser.anims.play("herido", true);
  }
  estatico() {
    this.bowser.anims.play("idle", true);
    this.bowser.setVelocityX(0);
  }

  debil() {
    this.bowser.anims.play("debil", true);
  }
  moverse(direccion) {
    if (!this.bowser.body.onWall()) {
      if (!this.choque) {
        this.bowser.anims.play("moverse", true);
        if (direccion == -1) this.bowser.flipX = true;
        else if (direccion == 1) this.bowser.flipX = false;
        this.bowser.setVelocityX(direccion * 50);
      } else {
        this.estatico();
        if (this.direccion != this.anterior) this.choque = false;
      }
    } else {
      this.choque = true;
      this.anterior = this.direccion;
    }
  }
  lanzafuego() {
    this.bowser.anims.play("fuego", true);
  }
  risa() {
    this.bowser.anims.play("risa", true);
  }
  herido = () => {
    console.log();
    this.bowser.anims.play("herido", true);
  };
  golpeado() {
    this.bowser.anims.play("golpeado", true);
  }
  defensa() {
    this.bowser.anims.play("defensa", true);
  }
  punch(animacion) {
    if (animacion == 0) this.bowser.anims.play("punch", true);
    else if (animacion == 1) this.bowser.anims.play("superpunch", true);
    else if (animacion == 2) this.bowser.anims.play("megapunch", true);
  }
  fallopunch() {
    this.bowser.anims.play("fallo", true);
  }
  victoria(animacion) {
    if (animacion == 0) this.bowser.anims.play("victoria1", true);
    else if (animacion == 1) this.bowser.anims.play("victoria2", true);
    else if (animacion == 2) this.bowser.anims.play("victoria3", true);
  }
  muerto() {
    this.bowser.anims.play("muerto", true);
  }
}
