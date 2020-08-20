import Phaser from "phaser";
import { gameOptions } from "../constants"
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import flippie from "../assets/flyingbird.png"
import log from "../assets/one-log.png"
import gem from "../assets/gem-type3-red.png"

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image('mountainBG', mountainBG);
    this.load.image('mountainFar', mountainFar);
    this.load.image('mountains', mountains);
    this.load.image('mountainTrees', mountainTrees);
    this.load.image('mountainFGTrees', mountainFGTrees);

    this.load.image('log', log);
    this.load.spritesheet('flippie', flippie, { frameWidth: 32, frameHeight: 32, endFrame: 3 })

  },
  create: function create() {
    this.addBackground()
    this.loadFlippie()

    this.logGroup = this.physics.add.group();
    this.logPool = [];
    for(let i = 0; i < 4; i++){
        this.logPool.push(this.logGroup.create(0, 0, 'log'));
        this.logPool.push(this.logGroup.create(0, 0, 'log'));
        this.placeLogs(false);
    }
    this.logGroup.setVelocityX(-gameOptions.birdSpeed);
    this.bird = this.physics.add.sprite(80, gameOptions.gameHeight/ 2, 'flippie').play('fly');
    this.bird.angle = gameOptions.birdAngle
    this.bird.body.allowRotation = true
    this.bird.body.angularVelocity = gameOptions.birdAngularVelocity
    this.bird.body.gravity.y = gameOptions.birdGravity
    this.bird.scale = gameOptions.birdScale
    this.input.on('pointerdown', this.flap, this);
    this.score = 0;
    this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, '');
    this.updateScore(this.score);
  },
  update: function () {
    this.backgroundParallax()
    this.physics.world.collide(this.bird, this.logGroup, function(){
        this.die();
    }, null, this);
    if(this.bird.y > gameOptions.gameHeight || this.bird.y < 0){
        this.die();
    }
    this.logGroup.getChildren().forEach(function(log){
        if(log.getBounds().right < 0){
            this.logPool.push(log);
            if(this.logPool.length == 2){
                this.placeLogs(true);
            }
        }
    }, this)
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
      this.score += inc;
      this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
  },
  placeLogs: function(addScore){
      let rightmost = this.getRightmostLog();
      let logHoleHeight = Phaser.Math.Between(gameOptions.logHole[0], gameOptions.logHole[1]);
      let logHolePosition = Phaser.Math.Between(gameOptions.minLogHeight + logHoleHeight / 2, gameOptions.gameHeight- gameOptions.minLogHeight - logHoleHeight / 2);
      this.logPool[0].x = rightmost + this.logPool[0].getBounds().width + Phaser.Math.Between(gameOptions.logDistance[0], gameOptions.logDistance[1]);
      this.logPool[0].y = logHolePosition - logHoleHeight / 2;
      this.logPool[0].setOrigin(0, 1);
      this.logPool[1].x = this.logPool[0].x;
      this.logPool[1].y = logHolePosition + logHoleHeight / 2;
      this.logPool[1].setOrigin(0, 0);
      this.logPool[0].setSize(this.logPool[0].width - 35, this.logPool[0].height)
      this.logPool[1].setSize(this.logPool[1].width - 35, this.logPool[1].height - 35)
      this.logPool = [];
      if(addScore){
          this.updateScore(1);
      }
  },
  flap: function(){
      this.bird.body.velocity.y = -gameOptions.birdFlapPower;
      this.bird.anims.play('flap', true)
      this.bird.angle = gameOptions.birdAngle
  },
  getRightmostLog: function (){
      let rightmostLog = 0;
      this.logGroup.getChildren().forEach(function(log){
          rightmostLog = Math.max(rightmostLog, log.x);
      });
      return rightmostLog;
  },
  backgroundParallax: function() {
    this.mountainsBack.tilePositionX += 0.05
    this.mountainsMid3.tilePositionX += 0.15
    this.mountainsMid2.tilePositionX += 0.25
    this.mountainsMid1.tilePositionX += 0.35
    this.mountainsFront.tilePositionX += 0.75
  },
  die: function(){
      localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
      this.scene.start('winscreen')
  }
});
