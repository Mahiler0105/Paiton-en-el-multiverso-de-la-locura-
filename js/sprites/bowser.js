export default class bowser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y,"bowser");
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.bowser = null;
    }
    estatico(){
        this.anims.play("idle", true)
    }
    victoria(){

    }
    golpe(){

    }
    debil(){

    }
    rankear(){

    }
    caminar(){

    }
    punch(){

    }
    fallopunch(){

    }
    muerto(){

    }
    lanzafuego(){

    }
    risa(){

    }
    preload(){
        this.scene.load.path = "../../img/";
        this.scene.load.atlas("bowser", "bowser.png", "bowser.json")
    }
    create(){
        this.bowser = this.scene.physics.add.sprite(this.x, this.y, "bowser", "1.idle/0.png");
        this.bowser.setDisplaySize(150, 150)
        this.bowser.flipX = true     
        
        this.scene.anims.create({
            key: "idle",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "1.idle/", start: 0, end: 6, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "victory",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "2.victory_I/", start: 0, end: 34, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "golpe",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "3.simplepunch/", start: 0, end: 23, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "weaken",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "4.weaken/", start: 0, end: 15, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "levelup",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "5.victory_II/", start: 0, end: 10, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "caminata",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "6.caminatas/", start: 0, end: 15, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "superpunch",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "7.punch/", start: 0, end: 27, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "punchfail",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "8.punchfail/", start: 0, end: 14, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "dead",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "9.dead/", start: 0, end: 35, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "fire",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "10.fire/", start: 0, end: 6, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "laugth",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "11.laught/", start: 0, end: 28, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "laugth",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "12.megapunch/", start: 0, end: 28, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "laugth",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "13.defenseshell/", start: 0, end: 28, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "laugth",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "14.stunned/", start: 0, end: 28, suffix: ".png"}), frameRate: 10,
        });
        this.scene.anims.create({
            key: "laugth",
            frames: this.scene.anims.generateFrameNames("bowser", { prefix: "15.victory_III/", start: 0, end: 28, suffix: ".png"}), frameRate: 10,
        });
    }
    update(){       
        this.anims.play("idle", true)
        //this.estatico()
    }
}