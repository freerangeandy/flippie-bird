import Phaser from "phaser"

import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import flippieStand from "../assets/flyingbird.png"
import { gameOptions } from "../constants"
import { addBackgroundSprite, scaleSprite } from "../utils"

let graphics
let cursors
const headerConfig = {
  fontFamily: 'Palatino, serif',
  fontSize: '48px',
  color: '#28a4f7',
  stroke: '#fff7e2',
  strokeThickness: '2'
}
const textConfig = {
  fontFamily: 'Verdana, sans-serif',
  color: '#fff7e2',
  align: "center"
}

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'gameoverscreen' })
  },
  preload: function() {
    this.load.image('mountainBG', mountainBG)
    this.load.image('mountainFar', mountainFar)
    this.load.image('mountains', mountains)
    this.load.image('mountainTrees', mountainTrees)
    this.load.image('mountainFGTrees', mountainFGTrees)

    this.load.spritesheet('flippieStand', flippieStand, { frameWidth: 32, frameHeight: 32, endFrame: 6 })
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys()

    this.addBackground()
    graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 0.7)
    graphics.fillRect(0, 0, gameOptions.gameWidth, gameOptions.gameHeight)

    this.loadStandingFlippie()
    this.bird = this.physics.add.sprite(gameOptions.gameWidth / 2, gameOptions.gameHeight - 30, 'flippieStand').play('stand')

    this.add.text(145, 40, 'Game Over', headerConfig)
    this.lastScore = localStorage.getItem(gameOptions.localStorageScore) == null ? 0 : localStorage.getItem(gameOptions.localStorageScore)
    this.topScore = localStorage.getItem(gameOptions.localStorageBest) == null ? 0 : localStorage.getItem(gameOptions.localStorageBest)
    if (this.lastScore > this.topScore) {
      this.result = `You set a new high score of ${this.lastScore}!`
      localStorage.setItem(gameOptions.localStorageBest, this.lastScore)
    } else if (this.lastScore === this.topScore) {
      this.result = `You matched your high score of ${this.lastScore}!`
    } else {
      this.result = `Your score was ${this.lastScore}. Keep trying!`
    }
    this.add.text(gameOptions.gameWidth / 2 - 133, gameOptions.gameHeight / 2 + 20, `${this.result}\n        Press space to restart.        `, textConfig)
  },
  update: function () {
    if (cursors.space.isDown) {
      this.scene.start('splashscreen')
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
  loadStandingFlippie: function(){
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('flippieStand', { frames: [4,4,4,4,5,5,4,4,4,4,6,6] }),
      frameRate: 2,
      repeat: -1
    })
  },
})
