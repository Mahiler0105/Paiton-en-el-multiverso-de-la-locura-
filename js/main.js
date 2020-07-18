import Booloader from "./Bootloader.js";
import Loading from "./Loading.js";
import Start from "./Start.js";

let web = document.querySelectorAll("div")[1]
if (web != undefined) web.remove()

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
      gravity: { y: 690 },
    },
  },
  // plugins: {
  //   global: [{
  //       key: 'rexVirtualJoystick',
  //       plugin: VirtualJoystickPlugin,
  //       start: true
  //   }]
  // }
};

var game = new Phaser.Game(config);
var canva = document.querySelector("#container").lastChild;
canva.id = "nuevo";

if (game.renderType === 1) {
  game.renderer.resize(width, height);
  Phaser.Canvas.setSmoothingEnabled(game.context, false);
}

let actualLife = localStorage.getItem("vidas");
console.log(actualLife);
localStorage.setItem("vidas", 3);