import Phaser from "phaser";
import Game from "./scenes/Game";
import MainMenu from "./scenes/MainMenu";
import WinScreen from "./scenes/WinScreen";
import { gameOptions } from "./constants"

var config = {
  type: Phaser.AUTO,
  backgroundColor:0x87ceeb,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: gameOptions.gameWidth,
      height: gameOptions.gameHeight
  },
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {
              y: 0
          }
      }
  },
  scene: [MainMenu, Game, WinScreen]
};

var game = new Phaser.Game(config);
