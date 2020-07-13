import Powered from "../power.js";

export default class Paiton extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "paiton");
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.paiton = new Phaser.Physics.Arcade.Sprite(this.scene);

    this.derecha = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.izquierda = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.arriba = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.abajo = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.ataca = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.F
    );
    this.velocidad = 350;
    this.alturaSalto = -350;

    this.powerr = null;
    this.direccion = null;
    this.attacking = null;
    this.saltando = false;
    this.flag = false;

    this.live = 20;
    this.vida = null;
    this.energy = 200;
    this.energia = null;
  }

  preload() {
    this.scene.load.path = "../../img/";
    this.scene.load.atlas("paiton", "paiton.png", "paiton.json");
  }
  create() {
    this.paiton = this.scene.physics.add.sprite(
      this.x,
      this.y,
      "paiton",
      "1.moving/0.png"
    );
    this.paiton.setSize(75, 0);
    this.paiton.flipX = true;

    this.vida = this.scene.add.text(50, 40, `Vida: ${this.live}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    this.vida.setScrollFactor(0);
    this.energia = this.scene.add.text(50, 70, `Energia: ${this.energy}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    this.energia.setScrollFactor(0);

    // this.scene.physics.add.overlap(
    //     this.paiton,
    //     this.scene.coin,
    //     this.collectCoin,
    //     null,
    //     this
    // );

    this.scene.anims.create({
      key: "quieto",
      frames: this.scene.anims.generateFrameNames("paiton", {
        prefix: "2.move/",
        start: 0,
        end: 0,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "caminar",
      frames: this.scene.anims.generateFrameNames("paiton", {
        prefix: "1.moving/",
        start: 0,
        end: 17,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "saltar",
      frames: [{ key: "paiton", frame: "0.png" }],
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "agacharse",
      frames: this.scene.anims.generateFrameNames("paiton", {
        prefix: "3.surprise/",
        start: 4,
        end: 7,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "poder",
      frames: [{ key: "paiton", frame: "3.surprise/1.png" }],
      frameRate: 10,
    });

    this.scene.anims.create({
      key: "killeado",
      frames: this.scene.anims.generateFrameNames("paiton", {
        prefix: "4.dead/",
        start: 8,
        end: 14,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.anims.create({
      key: "fuego",
      frames: this.scene.anims.generateFrameNames("fire", {
        start: 0,
        end: 24,
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.scene.anims.create({
      key: "ball",
      frames: this.scene.anims.generateFrameNames("ball", {
        start: 0,
        end: 15,
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.powerr = new Powered(this.scene);
  }
  update() {
    this.paiton.setVelocityX(0);
    if (this.izquierda.isDown) {
      this.direccion = 0;
      this.paiton.setVelocityX(-this.velocidad);
      this.paiton.flipX = false;
    } else if (this.derecha.isDown) {
      this.direccion = 1;
      this.paiton.setVelocityX(this.velocidad);
      this.paiton.flipX = true;
    } else if (this.ataca.isDown) {
      this.powerr.fireLaser(this.paiton.x, this.paiton.y, this.direccion);

      if (!this.attacking && this.scene.energy > 0) {
        this.powerr.init();
      }
      this.attacking = true;
      //console.log(recibido);
      //console.log("atacando");
    } else if (this.ataca.isUp && this.attacking) {
      this.powerr.stop();
      this.attacking = false;
      //console.log("no atacando");
    } else if (this.arriba.isDown && this.paiton.body.onFloor()) {
      this.paiton.setVelocityY(this.alturaSalto);
      this.saltando = true;
    }

    let izqder =
      (this.izquierda.isDown || this.derecha.isDown) &&
      this.paiton.body.onFloor();

    if (izqder) {
      if (izqder && this.arriba.isDown) {
        this.paiton.setVelocityY(this.alturaSalto);
        this.paiton.anims.play("saltar", true);
      } else {
        this.flag = false;
        this.paiton.anims.play("caminar", true);
      }
      //console.log("Caminando");
    } else if (
      !this.paiton.body.onFloor() &&
      !this.abajo.isDown &&
      this.saltando
    ) {
      // this.paiton.setFrame(24);
      this.flag = false;
      this.paiton.anims.play("saltar", true);
      //console.log("Saltando");
    } else if (this.paiton.body.onFloor() && !this.arriba.isDown) {
      //console.log("Sobre el piso");
      this.paiton.anims.play("quieto", true);
      this.saltando = false;
    } else if (this.abajo.isDown) {
      //console.log("Abajo");
      this.flag = true;
      this.paiton.anims.play("agacharse", true);
    } else if (this.abajo.isUp && this.flag) {
      this.paiton.anims.play("poder", true);
      setTimeout(() => {
        this.flag = false;
      }, 1500);
    }
  }
  collectCoin(coin) {
    coin.destroy(coin.x, coin.y); // remove the tile/coin
    this.live = this.live + 20; // increment the score
    this.vida.setText(`Vida: ${this.live}`); // set the text to show the current score
    return false;
  }
  handleVida() {
    if (this.live > 0) {
      this.live = this.live - 20;
    } else {
      this.paiton.anims.play("killeado", true);
    }
    this.vida.setText(`Vida: ${this.live}`);
  }

  handlePower() {
    this.energy -= 8;
    this.energia.setText(`Energia: ${this.energy}`);
  }
}
