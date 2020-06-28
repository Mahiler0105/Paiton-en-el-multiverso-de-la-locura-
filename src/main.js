import Booloader from "./Bootloader.js";

const config = {
  title: "Paiton",
  width: 500,
  height: 500,
  parent: "container",
  backgroundColor: "#fff",
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Booloader],
};

new Phaser.Game(config);
