
export const gameOptions = {
  gameHeight: 320,
  gameWidth: 540,
  // bird gravity, will make bird fall if you don't flap
  birdGravity: 800,
  // horizontal bird speed
  birdSpeed: 125,
  birdAngle: 25,
  birdAngularVelocity: 40,
  birdScale: 1.5,
  // flap thrust
  birdFlapPower: 300,
  // minimum log height, in pixels. Affects hole position
  minLogHeight: 50,
  // distance range from next log, in pixels
  logDistance: [220, 280],
  // hole range between logs, in pixels
  logHole: [110, 150],
  // local storage object name
  localStorageName: 'bestFlappyScore'
}
