import Phaser from "phaser"
import { gameOptions } from "../constants"
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import flippie from "../assets/flyingbird.png"
import log from "../assets/one-log.png"
import gem from "../assets/gem-type3-red.png"

const scoresConfig = {
  fontFamily: 'Verdana, sans-serif',
  color: '#fff7e2',
}

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' })
    window.GAME = this
  },
  preload: function preload() {
    this.load.image('mountainBG', mountainBG)
    this.load.image('mountainFar', mountainFar)
    this.load.image('mountains', mountains)
    this.load.image('mountainTrees', mountainTrees)
    this.load.image('mountainFGTrees', mountainFGTrees)

    this.load.image('log', log)
    this.load.image('gem', gem)
    this.load.spritesheet('flippie', flippie, { frameWidth: 32, frameHeight: 32, endFrame: 3 })
  },
  create: function create() {
    this.addBackground()
    this.loadFlippie()

    this.score = 0

    this.logGroup = this.physics.add.group()
    this.logPool = []
    for(let i = 0; i < 4; i++){
        this.logPool.push(this.logGroup.create(0, 0, 'log'))
        this.logPool.push(this.logGroup.create(0, 0, 'log'))
        this.placeLogs(false)
    }
    this.logGroup.setVelocityX(-gameOptions.birdSpeed)

    this.gemGroup = this.physics.add.group()
    this.gemGroup.setVelocityX(-gameOptions.birdSpeed)
    this.placeGem()

    this.bird = this.physics.add.sprite(50, gameOptions.gameHeight/ 2, 'flippie').play('fly')
    this.bird.angle = gameOptions.birdAngle
    this.bird.body.allowRotation = true
    this.bird.body.angularVelocity = gameOptions.birdAngularVelocity
    this.bird.body.gravity.y = gameOptions.birdGravity
    this.bird.scale = gameOptions.birdScale
    this.physics.add.overlap(this.bird, this.gemGroup, this.collectGem, this.flipGravity, this)
    this.isFlipped = false

    this.input.on('pointerdown', this.flap, this)
    this.topScore = localStorage.getItem(gameOptions.localStorageBest) == null ? 0 : localStorage.getItem(gameOptions.localStorageBest)
    this.scoreText = this.add.text(10, 10, '', scoresConfig)
    this.updateScore(this.score)
  },
  update: function () {
    this.backgroundParallax()
    this.physics.world.collide(this.bird, this.logGroup, function(){
        this.die()
    }, null, this)
    if(this.bird.y > gameOptions.gameHeight + 10 || this.bird.y < -100){
        this.die()
    }
    this.logGroup.getChildren().forEach(function(log){
        if(log.getBounds().right < 0){
            this.logPool.push(log)
            if(this.logPool.length == 2){
                this.placeLogs(true)
                if (this.getRandomNum(3)){
                  this.placeGem()
                }
            }
        }
    }, this)
  },
  getRandomNum: function(sampleSize) {
    const value = Phaser.Math.Between(0, sampleSize)
    return value <= 1
  },
  collectGem: function(bird, gem) {
    gem.disableBody(true, true)
  },
  flipGravity: function() {
    this.isFlipped = !this.isFlipped
    this.gemGroup.getChildren().forEach(function(gem){
      gem.setFlipY(this.isFlipped)
    }, this)
    this.bird.setFlipY(this.isFlipped)
    this.bird.body.gravity.y = -this.bird.body.gravity.y
    if (this.isFlipped) {
      this.bird.angle = -gameOptions.birdAngle
      this.bird.body.angularVelocity = -gameOptions.birdAngularVelocity
    } else {
      this.bird.angle = gameOptions.birdAngle
      this.bird.body.angularVelocity = gameOptions.birdAngularVelocity
    }
    this.mountainsMid1.setFlipY(this.isFlipped)
    this.mountainsMid2.setFlipY(this.isFlipped)
    this.mountainsMid3.setFlipY(this.isFlipped)
    this.mountainsFront.setFlipY(this.isFlipped)
  },
  loadFlippie: function(){
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('flippie', { start: 1, end: 1, first: 1}),
      frameRate: 25,
      repeat: -1
    })
    this.anims.create({
      key: 'flap',
      frames: this.anims.generateFrameNumbers('flippie', { frames: [1,2,3,0,1] }),
      frameRate: 25,
      repeat: 0
    })
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
  updateScore: function(inc){
      this.score += inc
      this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore
  },
  placeLogs: function(addScore){
      const rightmost = this.getRightmostLog()
      const lowerBound = Math.max(gameOptions.logHole[0] - 2*this.score, gameOptions.minLogHole)
      const upperBound = Math.max(gameOptions.logHole[1] - 3*this.score, gameOptions.minLogHole)
      const logHoleHeight = Phaser.Math.Between(lowerBound, upperBound)
      const logHolePosition = Phaser.Math.Between(gameOptions.minLogHeight + logHoleHeight / 2, gameOptions.gameHeight- gameOptions.minLogHeight - logHoleHeight / 2)
      this.logPool[0].x = rightmost + this.logPool[0].getBounds().width + Phaser.Math.Between(gameOptions.logDistance[0], gameOptions.logDistance[1])
      this.logPool[0].y = logHolePosition - logHoleHeight / 2
      this.logPool[0].setOrigin(0, 1)
      this.logPool[1].x = this.logPool[0].x
      this.logPool[1].y = logHolePosition + logHoleHeight / 2
      this.logPool[1].setOrigin(0, 0)
      this.logPool[0].setSize(this.logPool[0].width - 35, this.logPool[0].height - 25)
      this.logPool[1].setSize(this.logPool[1].width - 35, this.logPool[1].height - 35)
      this.logPool = []
      if(addScore){
          this.updateScore(1)
      }
  },
  placeGem: function(){
    const rightmostLog = this.getRightmostLog()
    let gem = this.gemGroup.create(0, 0, 'gem')
    this.gemGroup.setVelocityX(-gameOptions.birdSpeed)
    gem.x = rightmostLog + gameOptions.logDistance[0]/2 + 50
    gem.y = Phaser.Math.Between(40, gameOptions.gameHeight - 40)
    gem.width = 20
    gem.displayWidth = gem.width
    gem.scaleY = gem.scaleX
  },
  flap: function(){
      if (this.isFlipped) {
        this.bird.body.velocity.y = gameOptions.birdFlapPower
        this.bird.angle = -gameOptions.birdAngle
      } else {
        this.bird.body.velocity.y = -gameOptions.birdFlapPower
        this.bird.angle = gameOptions.birdAngle
      }
      this.bird.anims.play('flap', true)
  },
  getRightmostLog: function (){
      let rightmostLog = 0
      this.logGroup.getChildren().forEach(function(log){
          rightmostLog = Math.max(rightmostLog, log.x)
      })
      return rightmostLog
  },
  backgroundParallax: function() {
    this.mountainsBack.tilePositionX += 0.05
    this.mountainsMid3.tilePositionX += 0.15
    this.mountainsMid2.tilePositionX += 0.25
    this.mountainsMid1.tilePositionX += 0.35
    this.mountainsFront.tilePositionX += 0.75
  },
  die: function(){
      localStorage.setItem(gameOptions.localStorageScore, this.score)
      localStorage.setItem(gameOptions.localStorageBest, this.topScore)
      this.scene.start('gameoverscreen')
  }
});
