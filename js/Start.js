export default class Start extends Phaser.Scene {
  constructor() {
    super("Main");
    this.origin = 0;
  }
  preload() {
    this.load.crossOrigin = "Anonymous";
    this.load.path = "../img/";
    this.load.image("main", "main.png");
    this.load.atlas(
      "controls-design",
      "controls-design.png",
      "controls-design.json"
    );
  }
  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.main = this.add.image(600, 300, "main");
    this.start = this.add
      .image(600, 535, "controls-design", "60.png")
      .setInteractive()
      .setScale(0.4, 0.4)
      .setVisible(true)
      .on("pointerdown", () => this.startBoot())
      .on("pointerover", () => (this.start.alpha = 0.8))
      .on("pointerout", () => (this.start.alpha = 1));
    this.word = this.add.text(600, 535, "Iniciar Juego", {
      fontFamily: 'El Messiri',
      fontSize: 20
    })
  }
  startBoot() {
    this.cameras.main.fade(500, 0, 0, 0);
    setTimeout(() => {
      switch(this.origin){
        case 0:
          console.log(0);
          this.scene.switch("Loading");
          break;
        case 1:
          console.log(1);
          this.scene.switch("Bootloader");
          this.scene.get("Bootloader").cameras.main.fadeIn(500, 0, 0, 0);
          this.scene.get("Bootloader").scene.scene.resumeall(0)
          break;
      }
    }, 500);
  }
}
