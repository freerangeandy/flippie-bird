import Phaser from "phaser";
import { gameOptions } from "../constants"
import pipe from "../assets/pipe.png"
import mountainBG from "../assets/parallax-mountain-bg.png"
import mountainFar from "../assets/parallax-mountain-montain-far.png"
import mountains from "../assets/parallax-mountain-mountains.png"
import mountainTrees from "../assets/parallax-mountain-trees.png"
import mountainFGTrees from "../assets/parallax-mountain-foreground-trees.png"
import flippie from "../assets/flyingbird.png"

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

    this.load.image('pipe', pipe);
    this.load.spritesheet('flippie', flippie, { frameWidth: 32, frameHeight: 32, endFrame: 3 })

  },
  create: function create() {
    this.addBackground()
    this.loadFlippie()

    this.pipeGroup = this.physics.add.group();
    this.pipePool = [];
    for(let i = 0; i < 4; i++){
        this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
        this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
        this.placePipes(false);
    }
    this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
    this.bird = this.physics.add.sprite(80, gameOptions.gameHeight/ 2, 'flippie').play('fly');
    this.bird.angle = 35
    this.bird.body.gravity.y = gameOptions.birdGravity;
    this.input.on('pointerdown', this.flap, this);
    this.score = 0;
    this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, '');
    this.updateScore(this.score);
  },
  loadFlippie: function(){
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('flippie', { start: 1, end: 1, first: 1}),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'flap',
      frames: this.anims.generateFrameNumbers('flippie', { start: 0, end: 3, first: 0}),
      frameRate: 15,
      repeat: 15
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
  placePipes: function(addScore){
      let rightmost = this.getRightmostPipe();
      let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
      let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, gameOptions.gameHeight- gameOptions.minPipeHeight - pipeHoleHeight / 2);
      this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
      this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
      this.pipePool[0].setOrigin(0, 1);
      this.pipePool[1].x = this.pipePool[0].x;
      this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
      this.pipePool[1].setOrigin(0, 0);
      this.pipePool = [];
      if(addScore){
          this.updateScore(1);
      }
  },
  flap: function(){
      this.bird.body.velocity.y = -gameOptions.birdFlapPower;
  },
  getRightmostPipe: function (){
      let rightmostPipe = 0;
      this.pipeGroup.getChildren().forEach(function(pipe){
          rightmostPipe = Math.max(rightmostPipe, pipe.x);
      });
      return rightmostPipe;
  },
  backgroundParallax: function() {
    this.mountainsBack.tilePositionX += 0.05
    this.mountainsMid3.tilePositionX += 0.15
    this.mountainsMid2.tilePositionX += 0.25
    this.mountainsMid1.tilePositionX += 0.35
    this.mountainsFront.tilePositionX += 0.75
  },
  update: function () {
    this.backgroundParallax()
    this.physics.world.collide(this.bird, this.pipeGroup, function(){
        this.die();
    }, null, this);
    if(this.bird.y > gameOptions.gameHeight || this.bird.y < 0){
        this.die();
    }
    this.pipeGroup.getChildren().forEach(function(pipe){
        if(pipe.getBounds().right < 0){
            this.pipePool.push(pipe);
            if(this.pipePool.length == 2){
                this.placePipes(true);
            }
        }
    }, this)
  },
  die: function(){
      localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
      this.scene.start('winscreen')
  }
});
