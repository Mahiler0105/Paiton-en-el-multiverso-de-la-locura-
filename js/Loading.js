export default class Loading extends Phaser.Scene {
    constructor() {
        super("Loading");
        this.origin = 0;
    }
    preload() {
        this.load.path = "../img/";        
        this.load.atlas('flares', 'flares.png', 'flares.json');
        this.load.image("loading", "charging.png");
        this.load.image("loadpage", "loading.png");
    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.add.image(600, 300, "loadpage");
        this.add.image(600, 300, "loading");
        
        var path = new Phaser.Curves.Path(610, 520).circleTo(20);
        var particles = this.add.particles('flares');
        particles.createEmitter({
            frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
            scale: { start: 0.1, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: path, quantity: 40, yoyo: false }
        });
        this.decideswitch();
    }
    decideswitch() {
        switch (this.origin) {
            case 0:
                setTimeout(() => {
                    console.log("Iniciando Bootloader");
                    this.goboot();
                }, 100);
                break;
            case 1:
                setTimeout(() => {
                    console.log("Reiniciando Bootloader");
                    this.goboot();
                    this.scene
                        .get("Bootloader")
                        .cameras.main.fadeIn(500, 0, 0, 0);
                    this.scene
                        .get("Bootloader").scene.restart();
                    this.scene.get("Bootloader").scene.scene.gamePaused = false;
                }, 1000);
                break;
        }
    }
    goboot() {
        this.cameras.main.fade(500, 0, 0, 0);
        setTimeout(() => {
            this.scene.switch("Bootloader");
        }, 500);
    }
}
