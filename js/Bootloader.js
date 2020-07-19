import Paiton from "../js/sprites/paiton.js";
import Bowser from "../js/sprites/bowser.js";
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
        this.paiton = null;
        this.bowser = null;
        this.ball = null;
        this.coin = null;
        this.gamePaused = false;

        this.intentos = localStorage.getItem("vidas");
        this.movil = false;
    }
    preload() {
        this.load.path = "../img/";
        this.load.tilemapTiledJSON("map", "pepito.json");
        this.load.image("tiles", "si-bicubic.png");
        this.load.image("coin", "lovelove.png");
        this.load.image("pause", "pause-tab.png");
        this.load.image("configure", "settings-tab.png");

        this.load.atlas("fire", "fire.png", "fire.json");
        this.load.atlas("ball", "ball.png", "ball.json");

        this.load.atlas("controls", "controls.png", "controls.json");
        this.load.atlas("controls-design", "controls-design.png", "controls-design.json");
        this.load.atlas("flares", "flares.png", "flares.json");

        this.paiton = new Paiton(this, 39, 400);
        this.paiton.preload();

        this.bowser = new Bowser(this, 1800, 100);
        this.bowser.preload();
    }

    create() {
        this.cameras.main.backgroundColor.setFromRGB(81, 209, 246);
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.mapa = this.make.tilemap({ key: "map" });
        this.cameras.main.setBounds(0, 0, this.mapa.widthInPixels, this.mapa.heightInPixels);
        this.tilesets = this.mapa.addTilesetImage("si-bicubic", "tiles");
        this.foraje = this.mapa.createDynamicLayer("complementario", this.tilesets, 0, 0);
        this.solidos = this.mapa.createDynamicLayer("solidos", this.tilesets, 0, 0);
        this.solidos.setCollisionByProperty({ solido: true });
        this.coinLayer = this.mapa.getObjectLayer("CoinLayer").objects;

        this.coin = this.physics.add.staticGroup();

        this.coinLayer.forEach((object) => {
            let obj = this.coin.create(object.x, object.y, "coin");
            obj.setScale(object.width / 500, object.height / 500);
            obj.body.width = 25;
            obj.body.height = 30;
            obj.body.position = {
                x: obj.body.position.x + 230,
                y: obj.body.position.y + 190,
            };
        });

        this.paiton.create();
        this.physics.add.collider(this.paiton.paiton, this.solidos);
        this.physics.add.overlap(this.paiton.paiton, this.coin, this.paiton.collectCoin, null, this);
        this.cameras.main.startFollow(this.paiton.paiton, true, 50, 50, 50, 200);

        this.bowser.create();
        this.physics.add.collider(this.bowser.bowser, this.solidos);
        this.physics.add.collider(this.paiton.paiton, this.bowser.bowser, this.paiton.reaccionar);
        this.pause = this.add
            .image(600, 70, "controls-design", "64.png")
            .setInteractive()
            .setScale(0.5, 0.5)
            .on("pointerdown", () => this.pauseall())
            .on("pointerover", () => (this.pause.alpha = 0.8))
            .on("pointerout", () => (this.pause.alpha = 1))
            .setScrollFactor(0);

        this.configuring = false;
        this.menupause = new Phaser.GameObjects.Group();
        this.resume = this.add.image(600, 300, "pause").setScale(0.6, 0.6).setScrollFactor(0);
        this.exit = this.add
            .image(840, 140, "controls-design", "65.png")
            .setInteractive()
            .setScale(0.4, 0.4)
            .setDepth(40000)
            .on("pointerdown", () => this.resumeall(this.configuring ? 2 : 1))
            .on("pointerover", () => (this.exit.alpha = 0.8))
            .on("pointerout", () => (this.exit.alpha = 1))
            .setScrollFactor(0);
        this.play = this.add
            .image(466, 390, "controls-design", "60.png")
            .setInteractive()
            .setScale(0.6, 0.6)
            .on("pointerdown", () => this.resumeall(0))
            .on("pointerover", () => (this.play.alpha = 0.8))
            .on("pointerout", () => (this.play.alpha = 1))
            .setScrollFactor(0);
        this.replay = this.add
            .image(599, 390, "controls-design", "61.png")
            .setInteractive()
            .setScale(0.6, 0.6)
            .on("pointerdown", () => this.replayall())
            .on("pointerover", () => (this.replay.alpha = 0.8))
            .on("pointerout", () => (this.replay.alpha = 1))
            .setScrollFactor(0);
        this.menu = this.add
            .image(732, 390, "controls-design", "63.png")
            .setInteractive()
            .setScale(0.6, 0.6)
            .on("pointerdown", () => this.gomenu())
            .on("pointerover", () => (this.menu.alpha = 0.8))
            .on("pointerout", () => (this.menu.alpha = 1))
            .setScrollFactor(0);
        this.settings = this.add
            .image(360, 140, "controls-design", "56.png")
            .setInteractive()
            .setScale(0.6, 0.6)
            .on("pointerdown", () => this.opensettings())
            .on("pointerover", () => (this.settings.alpha = 0.8))
            .on("pointerout", () => (this.settings.alpha = 1))
            .setScrollFactor(0);
        this.menupause.add(this.resume).add(this.play).add(this.replay).add(this.menu).add(this.settings).add(this.exit).setVisible(false);

        this.menusettings = new Phaser.GameObjects.Group();
        this.configure = this.add.image(600, 300, "configure").setScale(0.6, 0.6).setScrollFactor(0);
        this.passmovil = this.add
            .image(700, 280, "controls-design", this.movil ? "59.png" : "53.png")
            .setInteractive()
            .setScale(0.8, 0.8)
            .setScrollFactor(0)
            .on("pointerdown", () => this.switchmovil())
            .on("pointerover", () => (this.passmovil.alpha = 0.8))
            .on("pointerout", () => (this.passmovil.alpha = 1));

        this.initialkeys = ['A', 'W', 'D', 'S', 'F']
        this.change = [];
        for (let i = 0; i < 5; i++) {
            this.change.push(
                this.add
                    .image(735, 355 + i * 29.4, "controls", "button-horizontal-0.png")
                    .setInteractive()
                    .setScale(0.8, 0.8)
                    .setScrollFactor(0)
                    .on("pointerdown", () => this.change[0+i*2].setTintFill(255, 255, 255, 255))
                    .on("pointerover", () => (this.change[0+i*2].alpha = 0.8))
                    .on("pointerout", () => (this.change[0+i*2].alpha = 1))
            );
            this.change.push(
                this.add.text(728, 345+i*29.4, this.initialkeys[i], {
                    fontFamily: 'Comic Sans MS',
                    fontSize: "15px",
                    fill: "#fce7b2",
                }).setScrollFactor(0)
            )
        }
        
        // this.button = this.add.image(735,355, "controls", "button-horizontal-0.png")
        //     .setInteractive().setScale(0.8, 0.8).setScrollFactor(0)
        //     .on("pointerdown", () => (this.button.setTintFill(255,255,255,255)))
        //     .on("pointerover", () => (this.button.alpha = 0.8))
        //     .on("pointerout", () => (this.button.alpha = 1))

        
        this.change.forEach((e)=>{
            this.menusettings.add(e)
        })
        this.menusettings
            .add(this.configure)
            .add(this.passmovil)
            .add(this.exit)
            .setVisible(false);

        this.input.keyboard.on("keydown", (e) => {
            console.dir(e.key);

            this.keys = this.input.keyboard.addKeys("P,H,A,S,E");

            this.izquierda = this.keys[Object.keys(this.keys)[0]];
            this.arriba = this.keys[Object.keys(this.keys)[1]];
            this.derecha = this.keys[Object.keys(this.keys)[2]];
            this.abajo = this.keys[Object.keys(this.keys)[3]];
            this.ataque = this.keys[Object.keys(this.keys)[4]];
        });
    }

    pauseall() {
        this.pause.setScale(0.4, 0.4);
        setTimeout(() => {
            this.pause.setScale(0.5, 0.5);
        }, 100);
        this.gamePaused = true;
        this.input.stopPropagation();
        this.menupause.setVisible(true);
    }
    resumeall(button) {
        button == 0 ? this.play.setScale(0.5, 0.5) : this.exit.setScale(0.3, 0.3);
        setTimeout(() => {
            switch (button) {
                case 0:
                    this.play.setScale(0.6, 0.6);
                    this.gamePaused = false;
                    this.menupause.setVisible(false);
                    break;
                case 1:
                    this.exit.setScale(0.4, 0.4);
                    this.gamePaused = false;
                    this.menupause.setVisible(false);
                    break;
                case 2:
                    this.configuring = false;
                    this.exit.setScale(0.4, 0.4);
                    this.gamePaused = false;
                    this.menupause.setVisible(false);
                    this.menusettings.setVisible(false);
            }
        }, 100);
    }
    replayall() {
        console.log("Recargando por boton");

        this.replay.setScale(0.5, 0.5);
        setTimeout(() => {
            this.replay.setScale(0.6, 0.6);
        }, 100);

        this.cameras.main.fade(500, 0, 0, 0);
        setTimeout(() => {
            this.scene.switch("Loading");
            this.scene.get("Loading").cameras.main.fadeIn(500, 0, 0, 0);
            this.scene.get("Loading").scene.scene.origin = 1;
            this.scene.get("Loading").scene.scene.decideswitch();
        }, 500);
    }
    gomenu() {
        this.menu.setScale(0.5, 0.5);
        setTimeout(() => {
            this.menu.setScale(0.6, 0.6);
            this.cameras.main.fade(500, 0, 0, 0);
            this.menupause.setVisible(false);
            this.scene.switch("Main");
            this.scene.get("Main").cameras.main.fadeIn(500, 0, 0, 0);
            this.scene.get("Main").scene.scene.origin = 1;
            this.scene.get("Main").scene.scene.word.setText("Reanudar Juego");
        }, 100);
    }
    opensettings() {
        this.configuring = true;
        this.settings.setScale(0.5, 0.5);
        setTimeout(() => {
            this.settings.setScale(0.6, 0.6);
            this.menusettings.setVisible(true);
        }, 100);
    }
    switchmovil = () => {
        this.passmovil.setScale(0.7, 0.7);
        setTimeout(() => {
            this.passmovil.setScale(0.8, 0.8);
        }, 30);
        if (!this.movil) {
            this.movil = true;
            this.passmovil.setFrame("59.png");
        } else {
            this.movil = false;
            this.passmovil.setFrame("53.png");
        }
        console.log(this.movil);
    };
    update() {
        if (!this.gamePaused) {
            this.paiton.update();
            this.bowser.update();

            if (this.ball != null) {
                this.ball.update();
            }
        }
    }
}
