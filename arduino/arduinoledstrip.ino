const int RED_PIN = 9;
const int GREEN_PIN = 10;
const int BLUE_PIN = 11;
 
int BLACK[] = {0, 0, 0};
const int RED[]   = {255, 0, 0};
const int GREEN[] = {0, 255, 0};
const int BLUE[]  = {0, 0, 255};
const int WHITE[] = {255, 255, 255};

const int MAX_BRIGHTNESS = 255;
int *curColor;

void printColor(String info, int r, int g, int b) {
  int color[] = {r, g, b};
  printColorInt(info, color);
}

void printColor(String info, double r, double g, double b) {
  double color[] = {r, g, b};
  printColorDouble(info, color);
}

void printColor(String info, int color[3]) {
  int doubleColor[] = {color[0], color[1], color[2]};
  printColorInt(info, doubleColor);
}

void printColor(String info, double color[3]) {
  double doubleColor[] = {color[0], color[1], color[2]};
  printColorDouble(info, doubleColor);
}

void printColorInt(String info, int color[3]) {
  Serial.print(info);
  Serial.print(": ");
  Serial.print(color[0]);
  Serial.print('/');
  Serial.print(color[1]);
  Serial.print('/');
  Serial.println(color[2]);
}

void printColorDouble(String info, double color[3]) {
  Serial.print(info);
  Serial.print(": ");
  Serial.print(color[0]);
  Serial.print('/');
  Serial.print(color[1]);
  Serial.print('/');
  Serial.println(color[2]);
}

void setup() {
  // Serial.begin(9600);  
  //Declaring LED pins as output
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  curColor = BLACK;
}

int decimalLinearInterpolation(int oldValue, int oldMax, int newMax) {
  return round(oldValue * newMax  / oldMax);
}

int reCalculate(int value, int newMax) {
  const int dimmed = decimalLinearInterpolation(value, 255, MAX_BRIGHTNESS);
  return decimalLinearInterpolation(dimmed, MAX_BRIGHTNESS, newMax); 
}

void setColor(int color[3]) {
  analogWrite(RED_PIN, reCalculate(color[0], 255));
  analogWrite(GREEN_PIN, reCalculate(color[1], 150));
  analogWrite(BLUE_PIN, reCalculate(color[2], 255));
}

void fadeFromColorToColor(int from[3], int to[3], int steps, int timeDelay) {
  const int deltaR = to[0] - from[0];
  const int deltaG = to[1] - from[1];
  const int deltaB = to[2] - from[2];
  const double deltaRStep = (double) deltaR / (double) steps;
  const double deltaGStep = (double) deltaG / (double) steps;
  const double deltaBStep = (double) deltaB / (double) steps;  
  double curR = (double) from[0];
  double curG = (double) from[1];
  double curB = (double) from[2];

  for(int i=0; i<steps; i++) {
    int colorToSet[3];
    colorToSet[0] = round(curR);
    colorToSet[1] = round(curG);
    colorToSet[2] = round(curB);

    // printColor("color change", colorToSet);
    setColor(colorToSet);

    curR += deltaRStep;
    curG += deltaGStep;
    curB += deltaBStep;

    delay(timeDelay);
  }
}

void copyColor(int color[3], int *destColor) {
  for(int i=0; i<3; i++) {
    destColor[i] = color[i];
  }
}

int ranVal() { return (int) random(0,256); }

void loop() {
  int toColor[] = {ranVal(), ranVal(), ranVal()};
  // printColor("new color", toColor);
  fadeFromColorToColor(curColor, toColor, 128, 100);
  copyColor(toColor, curColor);
}
