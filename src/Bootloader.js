class Bootloader extends Phaser.Scene {
  constructor() {
    super("Bootloader");
    this.velocidad = 350;
    this.alturaSalto = -350;
  }
  preload() {
    this.load.path = "./assets/";
    this.load.tilemapTiledJSON("map", "primero.json");
    this.load.image("tiles", "terrain.png");
    this.load.spritesheet("personaje1", "personaje1.png", {
      frameWidth: 57,
      frameHeight: 62,
    });
  }
  create() {
    // CONFIGURACION DE MAPA
    this.mapa = this.make.tilemap({ key: "map" });
    this.tilesets = this.mapa.addTilesetImage("terrain", "tiles");
    this.foraje = this.mapa.createDynamicLayer("foraje", this.tilesets, 0, 0);
    this.solidos = this.mapa.createDynamicLayer("solidos", this.tilesets, 0, 0);
    this.solidos.setCollisionByProperty({ solido: true });

    // CONFIGURACION DE PERSONAJE
    this.jugador = this.physics.add.sprite(40, 400, "personaje1", 0);
    this.jugador.setSize(25, 0);

    this.derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.izquierda = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.anims.create({
      key: "caminar",
      frames: this.anims.generateFrameNumbers("personaje1", {
        start: 1,
        end: 8,
      }),
      frameRate: 10,
    });

    this.physics.add.collider(this.jugador, this.solidos);
    this.cameras.main.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels
    );
    this.cameras.main.startFollow(this.jugador);
  }

  update() {
    this.jugador.setVelocityX(0);
    if (this.izquierda.isDown) {
      this.jugador.setVelocityX(-this.velocidad);
      this.jugador.flipX = true;
    } else if (this.derecha.isDown) {
      this.jugador.setVelocityX(this.velocidad);
      this.jugador.flipX = false;
    } else if (this.arriba.isDown && this.jugador.body.onFloor()) {
      this.jugador.setVelocityY(this.alturaSalto);
    }

    if (
      (this.izquierda.isDown || this.derecha.isDown) &&
      this.jugador.body.onFloor()
    ) {
      this.jugador.anims.play("caminar", true);
    } else if (!this.jugador.body.onFloor()) {
      this.jugador.setFrame(9);
    } else {
      this.jugador.setFrame(0);
    }
  }
}

export default Bootloader;
