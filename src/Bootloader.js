class Bootloader extends Phaser.Scene {
  constructor() {
    super("Bootloader");
  }
  preload() {
    console.log("Boodloader :D");
    this.load.path = "./assets";
  }
  create() {}
  update() {}
}

export default Bootloader;
