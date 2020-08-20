import Phaser from "phaser";
import { gameOptions } from "../constants"

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'winscreen' });
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, gameOptions.gameWidth, gameOptions.gameHeight);

    this.add.text(gameOptions.gameWidth - 310, gameOptions.gameHeight / 2, "You win! Press space to restart.")
  },
  update: function () {
    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
})
