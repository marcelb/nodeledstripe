const Gpio = require('pigpio').Gpio;


const RED_PIN = 17;
const GREEN_PIN = 22;
const BLUE_PIN = 24;
 
const redLed = new Gpio(RED_PIN, {mode: Gpio.OUTPUT});
const greenLed = new Gpio(GREEN_PIN, {mode: Gpio.OUTPUT});
const blueLed = new Gpio(BLUE_PIN, {mode: Gpio.OUTPUT});


function setColor(r,g,b) {

}
 
let dutyCycle = 0;
 
setInterval(() => {
  redLed.pwmWrite(dutyCycle);
  greenLed.pwmWrite(Math.round(dutyCycle * 0.01));
  blueLed.pwmWrite(dutyCycle);
 
  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 200);
