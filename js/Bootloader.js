import Paiton from "../js/sprites/paiton.js";
import Bowser from "../js/sprites/bowser.js";
export default class Bootloader extends Phaser.Scene {
  constructor() {
    super("Bootloader");
    this.paiton = null;
    this.bowser = null;

    this.coin = null;
    this.live = 20;
    this.vida = null;
    this.energy = 200;
    this.energia = null;
    this.shotTime = 0;
  }

  collectCoin(player, coin) {
    coin.destroy(coin.x, coin.y); // remove the tile/coin
    this.live = this.live + 20; // increment the score
    this.vida.setText(`Vida: ${this.live}`); // set the text to show the current score
    return false;
  }

  handlePower() {
    this.energy -= 8;
    this.energia.setText(`Energia: ${this.energy}`);
  }

  preload() {
    this.load.path = "../img/";
    this.load.tilemapTiledJSON("map", "pepito.json");
    this.load.image("tiles", "si-bicubic.png");
    this.load.image("coin", "lovelove.png");

    this.load.atlas("fire", "fire.png", "fire.json");
    this.load.atlas("ball", "ball.png", "ball.json");

    this.paiton = new Paiton(this, 39, 400);
    this.paiton.preload();

    this.bowser = new Bowser(this, 1800, 100);
    this.bowser.preload();
  }

  create() {
    this.mapa = this.make.tilemap({ key: "map" });
    this.cameras.main.setBounds(
      0,
      0,
      this.mapa.widthInPixels,
      this.mapa.heightInPixels
    );
    this.tilesets = this.mapa.addTilesetImage("si-bicubic", "tiles");
    this.foraje = this.mapa.createDynamicLayer(
      "complementario",
      this.tilesets,
      0,
      0
    );
    this.solidos = this.mapa.createDynamicLayer("solidos", this.tilesets, 0, 0);
    this.solidos.setCollisionByProperty({ solido: true });

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
    this.physics.add.overlap(
      this.paiton.paiton,
      this.coin,
      this.collectCoin,
      null,
      this
    );
    this.cameras.main.startFollow(this.paiton.paiton, true, 50, 50, 50, 200);

    this.bowser.create();
    this.physics.add.collider(this.bowser.bowser, this.solidos);

    // var frame = this.textures.get('bowser').getFrameNames()
    // console.log(frame);

    // this.powerr = this.add.group();
    // this.powerr.enableBody = true;
    // this.powerr.createMultiple(5, "power");
    // this.powerr.physicsBodyType = Phaser.Physics.Arcade;
    // this.powerr.set
    // console.log(this.powerr);

    // this.powerr = this.physics.add.image(600, 50, "power");
    // this.powerr;
    // this.powerr.setVelocityX(-180);

    // this.powerr.setAll("anchor.y", 0.5);
  }
  update() {
    this.paiton.update();
    this.bowser.update();
  }
}
