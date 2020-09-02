import Phaser from "phaser"

import mountainBG from "./assets/parallax-mountain-bg.png"
import mountainFar from "./assets/parallax-mountain-montain-far.png"
import mountains from "./assets/parallax-mountain-mountains.png"
import mountainTrees from "./assets/parallax-mountain-trees.png"
import mountainFGTrees from "./assets/parallax-mountain-foreground-trees.png"
import { gameOptions } from "./constants"

function loadBackgroundImages(game) {
  game.load.image('mountainBG', mountainBG)
  game.load.image('mountainFar', mountainFar)
  game.load.image('mountains', mountains)
  game.load.image('mountainTrees', mountainTrees)
  game.load.image('mountainFGTrees', mountainFGTrees)
}

function addBackgroundSprite(game, spriteName){
  return game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    spriteName
  )
}

function scaleSprite(sprite, factor) {
  sprite.tileScaleX=factor
  sprite.tileScaleY=factor
}

function getRandomNum(sampleSize) {
  const value = Phaser.Math.Between(0, sampleSize)
  return value <= 1
}

export {
  loadBackgroundImages,
  addBackgroundSprite,
  scaleSprite,
  getRandomNum
}
