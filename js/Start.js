export default class Start extends Phaser.Scene {
    constructor(){
        super("Main")
    }
    preload(){
        this.load.path = "../img/";
        this.load.image("main", "main.png");
        this.load.atlas("controls-design", "controls-design.png", "controls-design.json");
    }
    create(){
        this.cameras.main.fadeIn(500, 0,0,0)
        this.main = this.add.image(600, 300, "main")

        this.start = this.add.image(600,500, "controls-design", "60.png")
            .setInteractive().setScale(0.4, 0.4).setVisible(true)
            .on('pointerdown', () => this.startBoot() )
            .on('pointerover', () => this.start.alpha = 0.8 )
            .on('pointerout', () => this.start.alpha = 1 );
    }
    startBoot(){    
        this.cameras.main.fade(500, 0, 0, 0);
        setTimeout(() => { this.scene.switch('Loading') }, 500);           
    }
}