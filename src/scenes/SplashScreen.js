import Phaser from "phaser"

import { gameOptions, headerConfig, textConfig } from "../constants"
import { loadBackgroundImages, addBackgroundSprite, scaleSprite } from "../utils"

let cursors

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'splashscreen' })
  },
  preload: function preload() {
    loadBackgroundImages(this)
  },
  create: function() {
    this.addBackground()
    cursors = this.input.keyboard.createCursorKeys()

    this.add.text(20, 20, 'Flippie Bird', headerConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 20, "Press space to begin", textConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 40, "Click mouse button to flap", textConfig)
    this.add.text(20, gameOptions.gameHeight / 2 + 60, "Collect red gem to flip...", textConfig)
    this.topScore = localStorage.getItem(gameOptions.localStorageBest) == null ? 0 : localStorage.getItem(gameOptions.localStorageBest)
    this.add.text(20, gameOptions.gameHeight - 30, 'Best Score: ' + this.topScore, textConfig)
  },
  update: function () {
    this.backgroundParallax()
    if (cursors.space.isDown) {
      this.scene.start('game')
    }
  },
  addBackground: function(){
    this.mountainsBack = addBackgroundSprite(this, 'mountainBG')
    this.mountainsMid3 = addBackgroundSprite(this, 'mountainFar')
    this.mountainsMid2 = addBackgroundSprite(this, 'mountains')
    this.mountainsMid1 = addBackgroundSprite(this, 'mountainTrees')
    this.mountainsFront = addBackgroundSprite(this, 'mountainFGTrees')

    scaleSprite(this.mountainsBack, 2)
    scaleSprite(this.mountainsMid3, 2)
    scaleSprite(this.mountainsMid2, 2)
    scaleSprite(this.mountainsMid1, 2)
    scaleSprite(this.mountainsFront, 2)
  },
  backgroundParallax: function() {
    this.mountainsBack.tilePositionX += 0.01
    this.mountainsMid3.tilePositionX += 0.04
    this.mountainsMid2.tilePositionX += 0.09
    this.mountainsMid1.tilePositionX += 0.14
    this.mountainsFront.tilePositionX += 0.25
  }
})
