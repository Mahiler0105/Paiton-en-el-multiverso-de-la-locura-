import Booloader from "./Bootloader.js";

const config = {
    title: "Paiton",
    width: 1200,
    height: 600,
    autoResize: true,
    parent: "container",
    backgroundColor: "#51D1F6",
    pixelArt: true,
    type: Phaser.AUTO,
    scene: [Booloader],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 1000 },
        },
    },
};
new Phaser.Game(config);
