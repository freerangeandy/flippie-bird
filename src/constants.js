
export const gameOptions = {
  gameHeight: 320,
  gameWidth: 540,
  // bird gravity, will make bird fall if you don't flap
  birdGravity: 800,
  // horizontal bird speed
  birdSpeed: 125,
  birdAngle: 25,
  // flap thrust
  birdFlapPower: 300,
  // minimum pipe height, in pixels. Affects hole position
  minPipeHeight: 50,
  // distance range from next pipe, in pixels
  pipeDistance: [220, 280],
  // hole range between pipes, in pixels
  pipeHole: [100, 130],
  // local storage object name
  localStorageName: 'bestFlappyScore'
}
