const Gpio = require('pigpio').Gpio;


const RED_PIN = 17;
const GREEN_PIN = 22;
const BLUE_PIN = 24;
 
const redLed = new Gpio(RED_PIN, {mode: Gpio.OUTPUT});
const greenLed = new Gpio(GREEN_PIN, {mode: Gpio.OUTPUT});
const blueLed = new Gpio(BLUE_PIN, {mode: Gpio.OUTPUT});

const BLACK = [0, 0, 0];
const RED   = [255, 0, 0];
const GREEN = [0, 80, 0];
const BLUE  = [0, 0, 255];
const WHITE = [255, 255, 255];

function fixGreen(value) {
  return value;
}

function setColor(color) {
  redLed.pwmWrite(color[0]);
  greenLed.pwmWrite(fixGreen(color[1]));
  blueLed.pwmWrite(color[2]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeFromColorToColor(from, to, steps, speed) {
  const deltaR = to[0] - from[0];
  const deltaG = to[1] - from[1];
  const deltaB = to[2] - from[2];
  const deltaRStep = deltaR / steps;
  const deltaGStep = deltaG / steps;
  const deltaBStep = deltaB / steps;
  let curR = from[0];
  let curG = from[1];
  let curB = from[2];

  for(let i=0; i<steps; i++) {
    // console.log(curR, curG, curB);
    setColor([
      Math.round(curR),
      Math.round(curG),
      Math.round(curB)
    ]);

    curR += deltaRStep;
    curG += deltaGStep;
    curB += deltaBStep;

    await sleep(speed);
  }
}

function ranVal() { return Math.floor(Math.random() * 256); }

async function run() {

  while(true) {
    console.log('Testing RED...');
    await fadeFromColorToColor(BLACK, RED, 128, 10);
    console.log('Testing GREEN...');
    await fadeFromColorToColor(BLACK, GREEN, 128, 10);
    console.log('Testing BLUE...');
    await fadeFromColorToColor(BLACK, BLUE, 128, 10);
    console.log('Done... Repeat...');
  }
}

run();
