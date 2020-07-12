import Paiton from '../js/sprites/paiton.js';
import Bowser from '../js/sprites/bowser.js';
export default class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
        this.paiton = null;
        this.bowser = null;
        this.ball = null;        
        
        this.coin = null;
        this.shotTime = 0;        
    }    
    preload() {
        this.load.path = "../img/";
        this.load.tilemapTiledJSON("map", "pepito.json");
        this.load.image("tiles", "si-bicubic.png");
        this.load.image("coin", "lovelove.png");
        
        this.load.atlas("fire", "fire.png", "fire.json");
        this.load.atlas("ball", "ball.png", "ball.json");    
        
        this.paiton = new Paiton(this, 39, 400)
        this.paiton.preload()
        
        this.bowser = new Bowser(this, 1800, 100)
        this.bowser.preload()
    }
    
    create() {
       
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

        this.cameras.main.startFollow(this.paiton.paiton, true, 50, 50, 50, 200);
        // this.physics.add.overlap(
        //     this.paiton.paiton,
        //     this.coin,
        //     this.paiton.collectCoin,
        //     null,
        //     this
        // );
        

        this.bowser.create()
        this.physics.add.collider(this.bowser.bowser, this.solidos);
        //this.physics.add.collider(this.paiton.paiton, this.bowser.bowser);

       
        
        
        // this.physics.add.overlap(
        //     this.paiton.powerr,
        //     this.bowser.bowser,
        //     this.bowser.handleLife(false, true),
        //     null,
        //     this
        // );   
        //this.powerr = new Powered(this.scene);

        // var frame = this.textures.get('bowser').getFrameNames()
        // console.log(frame);
        
        
        // this.powerr = this.add.group();
        // this.powerr.enableBody = true;
        // this.powerr.createMultiple(5, "power");
        // this.powerr.physicsBodyType = Phaser.Physics.Arcade;
        // this.powerr.set
        // console.log(this.powerr);

        // this.powerr = this.physics.add.image(600, 50, "power");
        // this.powerr;
        // this.powerr.setVelocityX(-180);

        // this.powerr.setAll("anchor.y", 0.5);
        
    }  

    nuevo () {
        console.log("jajajaj")
    }
    update() {
        this.paiton.update()  
        this.bowser.update()
    }    
}
