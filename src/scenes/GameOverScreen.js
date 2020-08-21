import Phaser from "phaser";
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import flippieStand from "../assets/flyingbird.png"
import { gameOptions } from "../constants"

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'gameoverscreen' });
  },
  preload: function() {
    this.load.image('mountainBG', mountainBG);
    this.load.image('mountainFar', mountainFar);
    this.load.image('mountains', mountains);
    this.load.image('mountainTrees', mountainTrees);
    this.load.image('mountainFGTrees', mountainFGTrees);

    this.load.spritesheet('flippieStand', flippieStand, { frameWidth: 32, frameHeight: 32, endFrame: 6 })
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();

    this.addBackground()
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.7);
    graphics.fillRect(0, 0, gameOptions.gameWidth, gameOptions.gameHeight);

    this.loadStandingFlippie()
    this.bird = this.physics.add.sprite(80, gameOptions.gameHeight - 30, 'flippieStand').play('stand');

    this.add.text(gameOptions.gameWidth - 310, gameOptions.gameHeight / 2, "You win! Press space to restart.")
  },
  update: function () {
    if (cursors.space.isDown) {
      this.scene.start('splashscreen');
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
  loadStandingFlippie: function(){
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('flippieStand', { start: 4, end: 6, first: 4}),
      frameRate: 5,
      repeat: -1
    })
  },
})
