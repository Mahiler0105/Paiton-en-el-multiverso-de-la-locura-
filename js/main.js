import Booloader from "./Bootloader.js";
import Loading from "./Loading.js";
import Start from "./Start.js";

// document.querySelectorAll("div")[1].style.opacity = 0;
const config = {
  title: "Paiton",
  width: 1200,
  height: 600,
  autoResize: true,
  parent: "container",
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Start, Booloader, Loading],
  scale: {
    parent: "container",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 500 },
    },
  },
};

var game = new Phaser.Game(config);
var canva = document.querySelector("#container").lastChild;
console.log(canva);
canva.id = "nuevo";

if (game.renderType === 1) {
  game.renderer.resize(width, height);
  Phaser.Canvas.setSmoothingEnabled(game.context, false);
}

localStorage.setItem("vidas", 3);
