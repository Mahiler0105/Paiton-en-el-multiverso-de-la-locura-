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
    this.direccion = 0;
    this.attacking = null;
    this.saltando = false;
    this.recargando = false;

    this.live = 20;
    this.vida = null;
    this.energy = 200;
    this.energia = null;

    this.killed = false;
    this.versus = false;
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
        prefix: "4.dead1/",
        start: 8,
        end: 14,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
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
    this.power = new Powered(this.scene);
  }

  sobrepiso() {
    return this.paiton.body.onFloor();
  }

  quieto() {
    this.paiton.anims.play("quieto", true);
    this.saltando = false;
    this.paiton.setVelocityX(0);
  }
  moverse() {
    if (this.direccion == -1) this.paiton.flipX = false;
    else if (this.direccion == 1) this.paiton.flipX = true;
    this.paiton.setVelocityX(this.velocidad * this.direccion);

    if (this.saltando) this.paiton.anims.play("saltar", true);
    else this.paiton.anims.play("caminar", true);
  }
  saltar() {
    this.paiton.setVelocityY(this.alturaSalto);
    this.paiton.anims.play("saltar", true);
    this.saltando = true;
  }
  agacharse() {
    this.recargando = true;
    this.paiton.anims.play("agacharse", true);
  }
  soltarpoder() {
    this.paiton.anims.play("poder", true);
    setTimeout(() => {
      this.recargando = false;
    }, 1500);
  }

  reaccionar = () => {
    if (!this.versus) {
      console.log("hola");
      this.versus = true;
      this.handleVida();
    }
  };
  chocado() {
    if (this.versus) {
      this.saltando = true;

      console.log(this.scene.bowser.direccion);

      // this.paiton.setVelocityX();
      // this.paiton.setVelocityY(-350);
      this.soltarpoder();
      this.paiton.setVelocity(this.scene.bowser.direccion * 350, -350);
    }
    setTimeout(() => {
      this.saltando = false;
      this.versus = false;
      this.velocidad = 350;
    }, 500);
  }
  morir() {
    this.paiton.anims.play("killeado", true);
    this.paiton.setVelocityX(0);
    localStorage.setItem("vidas", this.scene.intentos - 1);
  }
  update() {
    //console.log(this.paiton.body.velocity.x)
    if (!this.killed) {
      if (!this.versus) {
        if (this.izquierda.isDown) {
          this.direccion = -1;
          this.moverse();
        } else if (this.derecha.isDown) {
          this.direccion = 1;
          this.moverse();
        }

        let izqder =
          (this.izquierda.isDown || this.derecha.isDown) && this.sobrepiso();

        if (izqder) {
          if (izqder && this.arriba.isDown) this.saltar();
          else {
            this.recargando = false;
            this.saltando = false;
            this.moverse();
          }
        } else if (this.arriba.isDown && this.sobrepiso()) {
          this.saltar();
        } else if (this.abajo.isDown) {
          this.agacharse();
        } else if (this.abajo.isUp && this.recargando) {
          this.soltarpoder();
        } else if (this.sobrepiso() && !this.arriba.isDown) {
          this.quieto();
        }

        if (this.ataca.isDown) {
          this.power.fireLaser(this.paiton.x, this.paiton.y, this.direccion);
          if (!this.attacking && this.energy > 0) this.power.init();
          this.attacking = true;
        } else if (this.ataca.isUp && this.attacking) {
          this.power.stop();
          this.attacking = false;
        }
      } else {
        this.chocado();
      }
    } else {
      this.morir();
    }
  }

  collectCoin = (player, coin) => {
    coin.destroy(coin.x, coin.y); // remove the tile/coin
    this.live = this.live + 20; // increment the score
    this.vida.setText(`Vida: ${this.live}`); // set the text to show the current score
  };

  handleVida() {
    if (this.live > 0) {
      this.live = this.live - 20;
    } else if (this.live == 0) {
      this.killed = true;
    }
    this.vida.setText(`Vida: ${this.live}`);
  }
  handlePower() {
    this.energy -= 8;
    this.energia.setText(`Energia: ${this.energy}`);
  }
}
