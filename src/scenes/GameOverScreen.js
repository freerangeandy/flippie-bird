import Phaser from "phaser";

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
    this.load.spritesheet('flippieStand', flippieStand, { frameWidth: 32, frameHeight: 32, endFrame: 6 })
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
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
  loadStandingFlippie: function(){
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('flippieStand', { start: 4, end: 6, first: 4}),
      frameRate: 5,
      repeat: -1
    })
  },
})
