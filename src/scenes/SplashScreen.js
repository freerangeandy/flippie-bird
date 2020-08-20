import Phaser from "phaser";
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import { gameOptions } from "../constants"

// let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'splashscreen' });
  },
  preload: function preload() {
    this.load.image('mountainBG', mountainBG);
    this.load.image('mountainFar', mountainFar);
    this.load.image('mountains', mountains);
    this.load.image('mountainTrees', mountainTrees);
    this.load.image('mountainFGTrees', mountainFGTrees);
  },
  create: function() {
    this.addBackground()
    cursors = this.input.keyboard.createCursorKeys();

    // graphics = this.add.graphics();
    // graphics.fillStyle(0x000000, 1);
    // graphics.fillRect(0, 0, gameOptions.gameWidth, gameOptions.gameHeight);

    this.add.text(gameOptions.gameWidth - 290, gameOptions.gameHeight / 2, "Press space to start.")
    this.add.text(gameOptions.gameWidth - 290, gameOptions.gameHeight / 2 + 15, "Click mouse button to flap.")
  },
  update: function () {
    this.backgroundParallax()
    if (cursors.space.isDown) {
      this.scene.start('game');
    }
  },
  addBackground: function(){
    this.mountainsBack = this.add.tileSprite(
      gameOptions.gameWidth/2,
      gameOptions.gameHeight/2,
      gameOptions.gameWidth,
      gameOptions.gameHeight,
      'mountainBG'
    )
    this.mountainsBack.tileScaleX=2
    this.mountainsBack.tileScaleY=2

    this.mountainsMid3 = this.add.tileSprite(
      gameOptions.gameWidth/2,
      gameOptions.gameHeight/2,
      gameOptions.gameWidth,
      gameOptions.gameHeight,
      'mountainFar'
    )
    this.mountainsMid3.tileScaleX=2
    this.mountainsMid3.tileScaleY=2

    this.mountainsMid2 = this.add.tileSprite(
      gameOptions.gameWidth/2,
      gameOptions.gameHeight/2,
      gameOptions.gameWidth,
      gameOptions.gameHeight,
      'mountains'
    )
    this.mountainsMid2.tileScaleX=2
    this.mountainsMid2.tileScaleY=2

    this.mountainsMid1 = this.add.tileSprite(
      gameOptions.gameWidth/2,
      gameOptions.gameHeight/2,
      gameOptions.gameWidth,
      gameOptions.gameHeight,
      'mountainTrees'
    )
    this.mountainsMid1.tileScaleX=2
    this.mountainsMid1.tileScaleY=2

    this.mountainsFront = this.add.tileSprite(
      gameOptions.gameWidth/2,
      gameOptions.gameHeight/2,
      gameOptions.gameWidth,
      gameOptions.gameHeight,
      'mountainFGTrees'
    )
    this.mountainsFront.tileScaleX=2
    this.mountainsFront.tileScaleY=2
  },
  backgroundParallax: function() {
    this.mountainsBack.tilePositionX += 0.01
    this.mountainsMid3.tilePositionX += 0.04
    this.mountainsMid2.tilePositionX += 0.09
    this.mountainsMid1.tilePositionX += 0.14
    this.mountainsFront.tilePositionX += 0.25
  }
})
