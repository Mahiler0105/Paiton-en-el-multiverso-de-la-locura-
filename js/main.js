import Booloader from "./Bootloader.js";
import Loading from "./Loading.js";
import Start from "./Start.js";

const config = {
  title: "Paiton",
  width: 1200,
  height: 600,
  autoResize: true,
  parent: "container",
  //backgroundColor: "#51D1F6",
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Start, Booloader, Loading],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 690 },
    },
  },
};
new Phaser.Game(config);

localStorage.setItem('vidas', 3);
