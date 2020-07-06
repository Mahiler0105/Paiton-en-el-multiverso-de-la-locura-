class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
        this.velocidad = 350;
        this.alturaSalto = -350;
        this.flag = false;
    }
    preload() {
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON("map", "primero.json");
        this.load.image("tiles", "terrain.png");
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
        // CONFIGURACION DE MAPA
        this.mapa = this.make.tilemap({ key: "map" });
        this.tilesets = this.mapa.addTilesetImage("terrain", "tiles");
        this.foraje = this.mapa.createDynamicLayer(
            "foraje",
            this.tilesets,
            0,
            0
        );
        this.solidos = this.mapa.createDynamicLayer(
            "solidos",
            this.tilesets,
            0,
            0
        );
        this.solidos.setCollisionByProperty({ solido: true });

        // CONFIGURACION DE PERSONAJE
        this.jugador = this.physics.add.sprite(40, 400, "personaje1", 0);
        this.jugador.setSize(75, 0);

        this.derecha = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
        this.izquierda = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.arriba = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );
        this.abajo = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );

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
