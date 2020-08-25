const Gpio = require('pigpio').Gpio;

const RED_PIN = 17;
const GREEN_PIN = 22;
const BLUE_PIN = 24;
 
const redLed = new Gpio(RED_PIN, {mode: Gpio.OUTPUT});
const greenLed = new Gpio(GREEN_PIN, {mode: Gpio.OUTPUT});
const blueLed = new Gpio(BLUE_PIN, {mode: Gpio.OUTPUT});

const BLACK = [0, 0, 0];
const RED   = [255, 0, 0];
const GREEN = [0, 255, 0];
const BLUE  = [0, 0, 255];
const WHITE = [255, 255, 255];
const MAX_BRIGHTNESS = 255;

function decimalLinearInterpolation(oldValue, oldMax, newMax) {
  return Math.round(oldValue * newMax  / oldMax);
}

function reCalculate(value, newMax) {
  const dimmed = decimalLinearInterpolation(value, 255, MAX_BRIGHTNESS);
  return decimalLinearInterpolation(dimmed, MAX_BRIGHTNESS, newMax); 
}

function setColor(color) {
  redLed.pwmWrite(reCalculate(color[0], 255));
  greenLed.pwmWrite(reCalculate(color[1], 150));
  blueLed.pwmWrite(reCalculate(color[2], 255));
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
  let curColor = BLACK.slice();

  while(true) {
    const toColor = [ranVal(), ranVal(), ranVal()];
    await fadeFromColorToColor(curColor, toColor, 128, 50);
    curColor = toColor;
  }
}

run();
