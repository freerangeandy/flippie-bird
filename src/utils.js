import { gameOptions } from "./constants"

export function addBackgroundSprite(game, spriteName){
  return game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    spriteName
  )
}

export function scaleSprite(sprite, factor) {
  sprite.tileScaleX=factor
  sprite.tileScaleY=factor
}
