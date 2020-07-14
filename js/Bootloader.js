import Paiton from '../js/sprites/paiton.js';
import Bowser from '../js/sprites/bowser.js';
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
        this.paiton = null;
        this.bowser = null;
        this.ball = null; 
        this.coin = null;
        this.gamePaused = false;

        this.c = 0

        this.intentos = localStorage.getItem('vidas');
    }    
    preload() {
        this.load.path = "../img/";
        this.load.tilemapTiledJSON("map", "pepito.json");
        this.load.image("tiles", "si-bicubic.png");
        this.load.image("coin", "lovelove.png");
        this.load.image("pause", "pause-tab.png");
        
        this.load.atlas("fire", "fire.png", "fire.json");
        this.load.atlas("ball", "ball.png", "ball.json"); 
        
        this.load.atlas("controls", "controls.png", "controls.json");
        this.load.atlas("controls-design", "controls-design.png", "controls-design.json");
        this.load.atlas('flares', 'flares.png', 'flares.json');
        
        this.paiton = new Paiton(this, 39, 400)
        this.paiton.preload()
        
        this.bowser = new Bowser(this, 1800, 100)
        this.bowser.preload()
    }
    
    create() {
        this.cameras.main.backgroundColor.setFromRGB(81,209,246)
        this.cameras.main.fadeIn(500, 0,0,0)
        this.mapa = this.make.tilemap({ key: "map" });
        this.cameras.main.setBounds(
            0,
            0,
            this.mapa.widthInPixels,
            this.mapa.heightInPixels
        );         
        this.tilesets = this.mapa.addTilesetImage("si-bicubic", "tiles");
        this.foraje = this.mapa.createDynamicLayer(
            "complementario",
            this.tilesets,
            0,
            0
        );
        this.solidos = this.mapa.createDynamicLayer(
            "solidos",
            this.tilesets,
            0,
            0
        );
        this.solidos.setCollisionByProperty({ solido: true });
        this.coinLayer = this.mapa.getObjectLayer("CoinLayer").objects;

        this.coin = this.physics.add.staticGroup();

        this.coinLayer.forEach((object) => {
            let obj = this.coin.create(object.x, object.y, "coin");
            obj.setScale(object.width / 500, object.height / 500);
            obj.body.width = 25;
            obj.body.height = 30;
            obj.body.position = {
                x: obj.body.position.x + 230,
                y: obj.body.position.y + 190,
            };
        });
        
        this.paiton.create()
        this.physics.add.collider(this.paiton.paiton, this.solidos);        
        this.physics.add.overlap(this.paiton.paiton, this.coin, this.paiton.collectCoin, null, this)
        this.cameras.main.startFollow(this.paiton.paiton, true, 50, 50, 50, 200);

      
        this.bowser.create()
        this.physics.add.collider(this.bowser.bowser, this.solidos);
        this.physics.add.collider(this.paiton.paiton, this.bowser.bowser, this.paiton.reaccionar);      
        
        
        // button = this.add.button(this.world.centerX - 95, 400, 'button', actionOnClick, this, 'over', 'out', 'down');
        // button.onInputOver.add(over, this);
        // button.onInputOut.add(out, this);

        this.pause = this.add.image(600,70, "controls-design", "64.png")
            .setInteractive().setScale(0.5, 0.5)
            .on('pointerdown', () => this.pauseall() )
            .on('pointerover', () => this.pause.alpha = 0.8 )
            .on('pointerout', () => this.pause.alpha = 1 )
            .setScrollFactor(0);
        
        this.resume = this.add.image(600, 300, "pause").setVisible(false).setScale(0.6, 0.6).setScrollFactor(0);

        this.exit = this.add.image(840, 140, "controls-design", "65.png")
            .setInteractive().setScale(0.4, 0.4).setVisible(false)
            .on('pointerdown', () => this.resumeall(1) )
            .on('pointerover', () => this.exit.alpha = 0.8 )
            .on('pointerout', () => this.exit.alpha = 1 )
            .setScrollFactor(0);
        
        this.play = this.add.image(466, 390, "controls-design", "60.png")
            .setInteractive().setScale(0.6, 0.6).setVisible(false)
            .on('pointerdown', () => this.resumeall(0) )
            .on('pointerover', () => this.play.alpha = 0.8 )
            .on('pointerout', () => this.play.alpha = 1 )
            .setScrollFactor(0);
        
        this.replay = this.add.image(599,390, "controls-design", "61.png")
            .setInteractive().setScale(0.6, 0.6).setVisible(false)
            .on('pointerdown', () => this.replayall() )
            .on('pointerover', () => this.replay.alpha = 0.8 )
            .on('pointerout', () => this.replay.alpha = 1 )
            .setScrollFactor(0);
        
        this.menu = this.add.image(732,390, "controls-design", "63.png")
            .setInteractive().setScale(0.6, 0.6).setVisible(false)
            .on('pointerdown', () => this.gomenu() )
            .on('pointerover', () => this.menu.alpha = 0.8 )
            .on('pointerout', () => this.menu.alpha = 1 )
            .setScrollFactor(0);

    }      
    pauseall () {
        this.pause.setScale(0.4,0.4)
        setTimeout(() => {
            this.pause.setScale(0.5,0.5)
        }, 100);
        this.gamePaused = true
        this.input.stopPropagation();
        this.resume.setVisible(true)

        this.play.setVisible(true)
        this.replay.setVisible(true)
        this.menu.setVisible(true)
        this.exit.setVisible(true)
    }
    resumeall(button){
        button == 0 ? this.play.setScale(0.5,0.5) : this.exit.setScale(0.3,0.3)
        setTimeout(() => {
            button == 0 ? this.play.setScale(0.6,0.6) : this.exit.setScale(0.4,0.4)
            this.resume.setVisible(false)
            this.play.setVisible(false)
            this.replay.setVisible(false)
            this.menu.setVisible(false)
            this.exit.setVisible(false)
            this.gamePaused = false
        }, 100);   
    }
    replayall(){
        this.replay.setScale(0.5,0.5)
        console.log('Recargando por boton');
        
        //this.input.stopPropagation();
        //this.scene.restart()

        // 
        // 
        // this.scene.get("Loading").reload = true       

        
        this.cameras.main.fade(500, 0, 0, 0);
        setTimeout(() => { this.replay.setScale(0.6,0.6) }, 100);

        setTimeout(() => {            
            this.scene.switch('Loading')
            this.scene.get('Loading').scene.restart()
        }, 500);
    }
    gomenu(){
        this.menu.setScale(0.5,0.5)
        setTimeout(() => {
            this.menu.setScale(0.6,0.6)
            this.cameras.main.fade(500, 0, 0, 0);

            this.scene.switch('Main')
            this.scene.get('Main').scene.restart()
        }, 100)

    }

    showmenu(){
        
    }

    
    update() {
        this.c = this.cameras.main.worldView.x       
                
        if(!this.gamePaused) {
            this.paiton.update() 
            this.bowser.update()

            if(this.ball != null){
                this.ball.update()
            }  
        }
        
    }    
}
