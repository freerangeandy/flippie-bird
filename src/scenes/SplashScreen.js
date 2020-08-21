import Phaser from "phaser";
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import { gameOptions } from "../constants"

let cursors;
const titleConfig = {
  fontFamily: 'Palatino, serif',
  fontSize: '48px',
  color: '#28a4f7',
  stroke: '#fff7e2',
  strokeThickness: '2'
}
const instructionsConfig = {
  fontFamily: 'Verdana, sans-serif',
  color: '#fff7e2',
}

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

    this.add.text(20, 20, 'Flippie Bird', titleConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 20, "Press space to begin", instructionsConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 40, "Click mouse button to flap", instructionsConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 60, "Collect red gem to flip...", instructionsConfig)
    this.topScore = localStorage.getItem(gameOptions.localStorageBest) == null ? 0 : localStorage.getItem(gameOptions.localStorageBest);
    this.add.text(20, gameOptions.gameHeight - 30, 'Best Score: ' + this.topScore, instructionsConfig);
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
