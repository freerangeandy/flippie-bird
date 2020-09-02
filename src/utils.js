import { gameOptions } from "./constants"

export function addBackground(game){
  game.mountainsBack = game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    'mountainBG'
  )
  game.mountainsBack.tileScaleX=2
  game.mountainsBack.tileScaleY=2

  game.mountainsMid3 = game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    'mountainFar'
  )
  game.mountainsMid3.tileScaleX=2
  game.mountainsMid3.tileScaleY=2

  game.mountainsMid2 = game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    'mountains'
  )
  game.mountainsMid2.tileScaleX=2
  game.mountainsMid2.tileScaleY=2

  game.mountainsMid1 = game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    'mountainTrees'
  )
  game.mountainsMid1.tileScaleX=2
  game.mountainsMid1.tileScaleY=2

  game.mountainsFront = game.add.tileSprite(
    gameOptions.gameWidth/2,
    gameOptions.gameHeight/2,
    gameOptions.gameWidth,
    gameOptions.gameHeight,
    'mountainFGTrees'
  )
  game.mountainsFront.tileScaleX=2
  game.mountainsFront.tileScaleY=2
}
