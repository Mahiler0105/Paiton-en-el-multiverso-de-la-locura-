export default class Start extends Phaser.Scene {
    constructor() {
        super("Main");
        this.origin = 0;
        this.recharge = false;
    }
    preload() {
        this.load.crossOrigin = "Anonymous";
        this.load.path = "../img/";
        this.load.image("main", "main.png");
        this.load.image("life-counter", "life-counter.png");
        this.load.image("lifetab", "life-tab.png");
        this.load.image("nolife", "nolife-tab.png");
        this.load.atlas("controls-design", "controls-design.png", "controls-design.json");
    }
    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.main = this.add.image(600, 300, "main");
        this.start = this.add
            .image(575, 535, "controls-design", "60.png")
            .setInteractive()
            .setScale(0.4, 0.4)
            .setVisible(true)
            .on("pointerdown", () => this.startBoot())
            .on("pointerover", () => (this.start.alpha = 0.8))
            .on("pointerout", () => (this.start.alpha = 1));
        this.word = this.add.text(625, 525, "Iniciar Juego", {
            fontFamily: "El Messiri",
            fontSize: 20,
        });
        this.lifecounter = this.add
            .image(1100, 50, "life-counter")
            .setInteractive()
            .setScale(0.4, 0.4)
            .setVisible(true)
            .on("pointerdown", () => this.openlife(0))
            .on("pointerover", () => (this.lifecounter.alpha = 0.8))
            .on("pointerout", () => (this.lifecounter.alpha = 1));

        this.life = this.add.image(600, 300, "lifetab").setScale(0.5, 0.5).setScrollFactor(0);
        this.nolife = this.add.image(600, 300, "nolife").setScale(0.5, 0.5).setScrollFactor(0);
        this.timer = this.add
            .text(600, 300, "0", {
                fontFamily: "Comic Sans MS",
                fontSize: "35px",
                fill: "#fce7b2",
            })
            .setScrollFactor(0)
            .setDepth(400);
        this.exit = this.add
            .image(770, 120, "controls-design", "65.png")
            .setInteractive()
            .setScale(0.4, 0.4)
            .setDepth(40000)
            .on("pointerdown", () => {
                this.exit.setScale(0.3, 0.3);
                setTimeout(() => {
                    this.exit.setScale(0.4, 0.4);
                    this.menulife.setVisible(false);
                }, 100);
            })
            .on("pointerover", () => (this.exit.alpha = 0.8))
            .on("pointerout", () => (this.exit.alpha = 1))
            .setScrollFactor(0);
        this.menulife = new Phaser.GameObjects.Group();
        this.menulife.add(this.life).add(this.nolife).add(this.exit).add(this.timer).setVisible(false);

        this.intentos = 0;
        this.lifeword = this.add
            .text(1120, 30, "3", {
                fontFamily: "Comic Sans MS",
                fontSize: "35px",
                fill: "#fce7b2",
            })
            .setScrollFactor(0);
        this.getlife();
    }
    openlife(option = 1) {
        if (option == 0) this.lifecounter.setScale(0.3, 0.3);
        //this.getlife();
        setTimeout(() => {
            if (option == 0) this.lifecounter.setScale(0.4, 0.4);
            this.menulife.setVisible(true);
            if (this.intentos == 0) {
                this.nolife.setDepth(400).setVisible(true);
                this.life.setDepth(0).setVisible(false);
            } else {
                this.nolife.setDepth(0).setVisible(false);
                this.life.setDepth(400).setVisible(true);
            }
        }, 100);
    }
    getlife() {
        this.intentos = localStorage.getItem("vidas");
        this.lifeword.setText(this.intentos);
        console.log(this.intentos);
    }
    interval() {
        this.t = 300;
        const lifetimer = setInterval(() => {
            if (this.t == 0) {
                console.log("time");
                localStorage.setItem("vidas", parseInt(this.intentos)+1);
                clearInterval(lifetimer);
                this.recharge = false;
            }
            let min = Math.trunc(this.t / 60);
            let seg = this.t % 60;

            this.timer.setText(`${min}:${seg}`);
            this.t--;
        }, 1000);
    }
    update() {
        this.getlife();
        if (this.intentos < 3 && !this.recharge) {
            this.interval();
            this.recharge = true;
        }
    }
    startBoot() {
        if (this.intentos == 0) {
            this.openlife();
        } else {
            this.cameras.main.fade(500, 0, 0, 0);
            this.start.setScale(0.3, 0.3);
            setTimeout(() => {
                switch (this.origin) {
                    case 0:
                        this.scene.switch("Loading");
                        break;
                    case 1:
                        this.scene.switch("Bootloader");
                        this.scene.get("Bootloader").cameras.main.fadeIn(500, 0, 0, 0);
                        this.scene.get("Bootloader").scene.scene.resumeall(0);
                        break;
                }
                this.start.setScale(0.4, 0.4);
            }, 500);
        }
    }
}
