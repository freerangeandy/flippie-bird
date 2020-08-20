import Phaser from "phaser";
import { gameOptions } from "../constants"
import bird from "../assets/bird.png"
import pipe from "../assets/pipe.png"

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image('bird', bird);
    this.load.image('pipe', pipe);
  },
  create: function create() {
    this.pipeGroup = this.physics.add.group();
    this.pipePool = [];
    for(let i = 0; i < 4; i++){
        this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
        this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
        this.placePipes(false);
    }
    this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
    this.bird = this.physics.add.sprite(80, gameOptions.gameHeight/ 2, 'bird');
    this.bird.body.gravity.y = gameOptions.birdGravity;
    this.input.on('pointerdown', this.flap, this);
    this.score = 0;
    this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
    this.scoreText = this.add.text(10, 10, '');
    this.updateScore(this.score);
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
  update: function () {
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
