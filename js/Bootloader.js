
class Pow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,"fire");
    }
    fire(x, y, z) {
        this.body.reset(x, y);
        z==0 ? this.setFlipX(false) : this.setFlipX(true);
        this.anims.play("fuego", true);
        this.body.setGravityY(-1000);
        this.setActive(true);
        this.setVisible(true);
        z == 0 ? this.setVelocityX(-500) : this.setVelocityX(500);
    }    
}

class Powered extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene
        this.timer = null;  
    }
    init(){
        this.createMultiple({
            classType: Pow,
            frameQuantity: 1,
            active: false,
            visible: false,
            key: "fire",
        });
        this.scene.handlePower()
        this.timer = setInterval(() => {
            this.createMultiple({
                classType: Pow,
                frameQuantity: 1,
                active: false,
                visible: false,
                key: "fire",
            });    
            this.scene.handlePower()    
        }, 1500);  
    }
    stop(){
        clearInterval(this.timer);
    }
    fireLaser(x, y, z) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, z);
        }
    }
}

class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
        this.velocidad = 350;
        this.alturaSalto = -350;
        this.flag = false;
        this.saltando = false;
        this.live = 20;
        this.energy = 200;
        this.coin = null;
        this.vida = null;
        this.energia = null;
        this.shotTime = 0;
        this.powerr = null;
        this.direccion = null;
        this.attacking = null;
    }
    preload() {
        this.load.path = "../img/";
        this.load.tilemapTiledJSON("map", "pepito.json");
        this.load.image("tiles", "si-bicubic.png");
        this.load.image("coin", "lovelove.png");
        //this.load.image("power", "dolar3.png");

        this.load.atlas("paiton", "paiton.png", "paiton.json")

        this.load.atlas("fire", "fire.png", "fire.json")      

    }
    create() {
        this.score = 0;

        let stye = { font: "20px Arial", fill: "#fff" };

        // CONFIGURACION DE MAPA
        this.mapa = this.make.tilemap({ key: "map" });
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

        this.jugador = this.physics.add.sprite(39, 400, "paiton", "1.moving/0.png");
        this.jugador.setSize(75, 0);
        this.jugador.flipX = true;


        this.fire = this.physics.add.sprite(50, 300, "fire", "0.png");

        this.derecha = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
        this.izquierda = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        this.arriba = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );
        this.abajo = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        this.ataca = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.F
        );
            
        this.anims.create({
            key: "quieto",
            frames: this.anims.generateFrameNames("paiton", {
                prefix: "2.move/",                
                start: 0,
                end: 0,
                suffix: ".png",
            }),
            frameRate: 10,
        });

        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNames("paiton", {
                prefix: "1.moving/",                
                start: 0,
                end: 17,
                suffix: ".png",
            }),
            frameRate: 10,
        });
        this.anims.create({
            key: "saltar",
            frames: this.anims.generateFrameNames("paiton", {                              
                start: 0,
                end: 0,
                suffix: ".png",
            }),
            frameRate: 10,
        });
        this.anims.create({
            key: "agacharse",
            frames: this.anims.generateFrameNames("paiton", {
                prefix: "3.surprise/",                
                start: 4,
                end: 7,
                suffix: ".png",
            }),
            frameRate: 10,
        });

        this.anims.create({
            key: "poder",
            frames: [{
                key: "paiton", frame: '3.surprise/1.png' 
            }],
            frameRate: 10,
        });

        this.anims.create({
            key: "fuego",
            frames: this.anims.generateFrameNames("fire", {                
                start: 0,
                end: 23,
                suffix: ".png",
            }),
            frameRate: 10,
        });

        this.fire.anims.play('fuego')
        this.physics.add.collider(this.jugador, this.solidos);
        this.physics.add.overlap(
            this.jugador,
            this.coin,
            this.collectCoin,
            null,
            this
        );
        this.cameras.main.setBounds(
            0,
            0,
            this.mapa.widthInPixels,
            this.mapa.heightInPixels
        );

        this.vida = this.add.text(50, 40, `Vida: ${this.live}`, {
            fontSize: "20px",
            fill: "#ffffff",
        });
        this.vida.setScrollFactor(0);
        this.energia = this.add.text(50, 70, `Energia: ${this.energy}`, {
            fontSize: "20px",
            fill: "#ffffff",
        });
        this.energia.setScrollFactor(0);
        // var scoreText = this.add.text(50, 40, "score:", style);

        this.cameras.main.startFollow(this.jugador, true, 50, 50, 50, 200);

        this.powerr = new Powered(this);
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

    collectCoin(player, coin) {
        coin.destroy(coin.x, coin.y); // remove the tile/coin
        this.live = this.live + 20; // increment the score
        this.vida.setText(`Vida: ${this.live}`); // set the text to show the current score
        return false;
    }
    handlePower (){
        this.energy -= 8;
        this.energia.setText(`Energia: ${this.energy}`)
    }

    update() {
        this.jugador.setVelocityX(0);
        if (this.izquierda.isDown) {
            this.direccion = 0;
            this.jugador.setVelocityX(-this.velocidad);
            this.jugador.flipX = false;
        } else if (this.derecha.isDown) {
            this.direccion = 1;
            this.jugador.setVelocityX(this.velocidad);
            this.jugador.flipX = true;
        }
        // MECANICA VUELO
        // else if (this.arriba.isDown) {
        //   this.jugador.setVelocityY(this.alturaSalto);
        // }
        else if (this.ataca.isDown) {
            this.powerr.fireLaser(this.jugador.x + 25, this.jugador.y, this.direccion);
            if (!this.attacking && this.energy>0){
                this.powerr.init()
            }            
            this.attacking = true;
            //this.handlePower();
            console.log('atacando');
            
        } else if(this.ataca.isUp && this.attacking){            
            this.powerr.stop()
            this.attacking = false;
            console.log('no atacando');
            

        } else if (this.arriba.isDown && this.jugador.body.onFloor()) {
            this.jugador.setVelocityY(this.alturaSalto);
            this.saltando = true;
        }

        let izqder = (this.izquierda.isDown || this.derecha.isDown) && this.jugador.body.onFloor() 

        if ( izqder ) {
            if ( izqder && this.arriba.isDown ) {
                this.jugador.setVelocityY(this.alturaSalto);
            }    
            this.flag = false;
            this.jugador.anims.play("caminar", true);
            console.log("Caminando");
        } else if (!this.jugador.body.onFloor() && !this.abajo.isDown && this.saltando) {
            // this.jugador.setFrame(24);
            this.flag = false;
            this.jugador.anims.play("saltar", true);
            console.log("Saltando");
        } else if(this.jugador.body.onFloor() && !this.arriba.isDown) {
            console.log('Sobre el piso');
            this.jugador.anims.play("quieto", true);
            this.saltando = false;
            
        } else if (this.abajo.isDown) {
            console.log("Abajo");
            this.flag = true;
            // this.jugador.anims.play("saltar", false);
            this.jugador.anims.play("agacharse", true);
        } else if (this.abajo.isUp && this.flag) {
            this.jugador.anims.play("poder", true);
            setTimeout(() => {
                this.flag = false;
            }, 1500);
        } 
    }
}

export default Bootloader;
