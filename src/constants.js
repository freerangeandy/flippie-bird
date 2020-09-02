const headerConfig = {
  fontFamily: 'Palatino, serif',
  fontSize: '48px',
  color: '#28a4f7',
  stroke: '#fff7e2',
  strokeThickness: '2'
}

const textConfig = {
  fontFamily: 'Verdana, sans-serif',
  color: '#fff7e2',
}

const centerTextConfig = {
  ...textConfig,
  align: "center"
}

const gameOptions = {
  gameHeight: 320,
  gameWidth: 540,
  birdGravity: 800,
  birdSpeed: 125,
  birdAngle: 25,
  birdAngularVelocity: 40,
  birdScale: 1.5,
  birdFlapPower: 300,
  minLogHeight: 50,
  logDistance: [220, 280],
  logHole: [110, 150],
  minLogHole: 75,
  localStorageScore: 'lastFlippieScore',
  localStorageBest: 'bestFlippieScore',
}

export {
  headerConfig,
  textConfig,
  centerTextConfig,
  gameOptions
}
