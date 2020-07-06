class Bootloader extends Phaser.Scene {
  constructor() {
    super("Bootloader");
    this.velocidad = 350;
    this.alturaSalto = -350;
    this.flag = false;
    this.live = 20;
    this.energy = 20;
    this.coin;
    this.vida;
    this.energia;
  }
  preload() {
    this.load.path = "./assets/";
    this.load.tilemapTiledJSON("map", "pepito.json");
    this.load.image("tiles", "si-bicubic.png");
    this.load.image("coin", "dolar.png");
    this.load.spritesheet("personaje1", "snake.png", {
      frameWidth: 95,
      frameHeight: 85,
    });
    this.load.spritesheet("personaje2", "snake.png", {
      frameWidth: 93,
      frameHeight: 93,
    });
  }
  create() {
    this.score = 0;

    let stye = { font: "20px Arial", fill: "#fff" };

    // CONFIGURACION DE MAPA
    this.mapa = this.make.tilemap({ key: "map" });
    this.tilesets = this.mapa.addTilesetImage("si-bicubic", "tiles");
    this.foraje = this.mapa.createDynamicLayer(
      "complementario",
      this.tilesets,
      0,
      0
    );
    this.solidos = this.mapa.createDynamicLayer("solidos", this.tilesets, 0, 0);
    this.solidos.setCollisionByProperty({ solido: true });

    this.coinLayer = this.mapa.getObjectLayer("CoinLayer")["objects"];
    this.coin = this.physics.add.staticGroup();

    this.coinLayer.forEach((object) => {
      let obj = this.coin.create(object.x, object.y, "coin");
      obj.setScale(object.width / 400, object.height / 400);
      obj.body.width = 25;
      obj.body.height = 30;
      obj.body.position = {
        x: obj.body.position.x + 115,
        y: obj.body.position.y + 115,
      };
    });

    // CONFIGURACION DE PERSONAJE
    this.jugador = this.physics.add.sprite(40, 400, "personaje1", 0);
    this.jugador.setSize(75, 0);
    // this.jugador.setDisplaySize(40, 40);

    this.derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.izquierda = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.anims.create({
      key: "caminar",
      frames: this.anims.generateFrameNumbers("personaje1", {
        start: 1,
        end: 12,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "saltar",
      frames: this.anims.generateFrameNumbers("personaje1", {
        start: 24,
        end: 24,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "agacharse",
      frames: this.anims.generateFrameNumbers("personaje2", {
        start: 63,
        end: 65,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: "poder",
      frames: this.anims.generateFrameNumbers("personaje2", {
        start: 62,
        end: 62,
      }),
      frameRate: 10,
    });

    this.physics.add.collider(this.jugador, this.solidos);
    this.physics.add.overlap(
      this.jugador,
      this.coin,
      this.collectCoin,
      null,
      this
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels
    );

    this.vida = this.add.text(50, 40, `Vida: ${this.live}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    this.vida.setScrollFactor(0);
    this.energia = this.add.text(50, 70, `Energia: ${this.energy}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    this.energia.setScrollFactor(0);
    // var scoreText = this.add.text(50, 40, "score:", style);

    this.cameras.main.startFollow(this.jugador, true, 50, 50, 50, 200);
  }

  collectCoin(player, coin) {
    coin.destroy(coin.x, coin.y); // remove the tile/coin
    this.live = this.live + 20; // increment the score
    this.vida.setText(`Vida: ${this.live}`); // set the text to show the current score
    return false;
  }

  update() {
    this.jugador.setVelocityX(0);
    if (this.izquierda.isDown) {
      this.jugador.setVelocityX(-this.velocidad);
      this.jugador.flipX = false;
    } else if (this.derecha.isDown) {
      this.jugador.setVelocityX(this.velocidad);
      this.jugador.flipX = true;
    }
    // MECANICA VUELO
    // else if (this.arriba.isDown) {
    //   this.jugador.setVelocityY(this.alturaSalto);
    // }
    else if (this.arriba.isDown && this.jugador.body.onFloor()) {
      this.jugador.setVelocityY(this.alturaSalto);
    }

    if (
      (this.izquierda.isDown || this.derecha.isDown) &&
      this.jugador.body.onFloor() &&
      !this.abajo.isDown
    ) {
      this.flag = false;
      this.jugador.anims.play("caminar", true);
    } else if (!this.jugador.body.onFloor() && !this.abajo.isDown) {
      // this.jugador.setFrame(24);
      this.flag = false;
      this.jugador.anims.play("saltar", true);
      console.log("Saltar");
    } else if (this.abajo.isDown) {
      console.log("Abajo");
      this.flag = true;
      // this.jugador.anims.play("saltar", false);
      this.jugador.anims.play("agacharse", true);
    } else if (this.abajo.isUp && this.flag) {
      this.jugador.anims.play("poder", true);
      setTimeout(() => {
        this.flag = false;
      }, 1500);
    } else {
      this.jugador.setFrame(0);
    }
  }
}

export default Bootloader;
