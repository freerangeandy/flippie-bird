import Phaser from "phaser"
import Game from "./scenes/Game"
import SplashScreen from "./scenes/SplashScreen"
import GameOverScreen from "./scenes/GameOverScreen"
import { gameOptions } from "./constants"

var config = {
  type: Phaser.AUTO,
  backgroundColor: 0xab6a8c,
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
          gravity: { y: 0 }
      }
  },
  scene: [SplashScreen, Game, GameOverScreen]
}

var game = new Phaser.Game(config)
