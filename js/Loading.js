export default class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
    this.reload = false;
  }
  preload() {
    this.load.path = "../img/";
    this.load.atlas("loading", "charging.png", "charging.json");
    this.load.image("loadpage", "loading.png");
  }
  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.add.image(600, 300, "loadpage");
    this.anims.create({
      key: "charge",
      frames: this.anims.generateFrameNames("loading", {
        prefix: "l",
        start: 1,
        end: 3,
        suffix: ".png",
      }),
      frameRate: 2,
    });
    this.cargando = this.physics.add.staticSprite(600, 300, "loading");

    setTimeout(() => {
      console.log("Iniciando Bootloader");

      this.cameras.main.fade(500, 0, 0, 0);
      setTimeout(() => {
        this.scene.switch("Bootloader");
      }, 500);

      if (this.reload) {
        console.log("Reiniciando Bootloader");
        this.scene.get("Bootloader").scene.restart();
      }
    }, 1000);
  }
  update() {
    this.cargando.anims.play("charge", true);
  }
}
